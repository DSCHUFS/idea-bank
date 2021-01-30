const { 
    SELECT_IDEA_IDS, 
    SELECT_PICK_HISTORY, 
    SELECT_UPLOAD_INFO, 
    SELECT_UPLOAD_USER_INFO, 
    UPDATE_USER_POINT,
    INSERT_PICK_HISTORY
} = require('../../query')
const { getToday, minusArray, getRandomNo, exportsValue } = require('../../lib')

exports.categoryAPI = async(req, res) => {
    const conn = await res.pool.getConnection()
    try{
        // 카테고리 선택 후 뽑으면 랜덤으로 1개를 보내준다(간단한내용), 포인트도 차감됨
        const category = req.params.category
        const user_id = res.user_id

        // ideas table에서 category에 해당하는 idea_id 가져오기
        let idea_ids = await conn.query(SELECT_IDEA_IDS, [category])
        idea_ids = await exportsValue(idea_ids[0], 'idea_id') // 일단은 해당 카테고리에 대한 아이디어가 많다고 가정

        // 사용자가 오늘 뽑은 idea_id 는 빼기
        const today = await getToday()
        let pick_history = await conn.query(SELECT_PICK_HISTORY, [user_id, today])
        pick_history = await exportsValue(pick_history[0], 'idea_id')

        // 남은 idea_id중 random으로 하나 뽑기
        idea_ids = await minusArray(idea_ids, pick_history) // 오늘 뽑은것 제외
        const idea_id = idea_ids[await getRandomNo(idea_ids.length)] // false일 때 err나는지 확인

        if(!today || !idea_ids) throw e

        // 해당 idea를 올린 user_id(작성자), 내용
        let idea = await conn.query(SELECT_UPLOAD_INFO, [idea_id])
        const { idea_title, idea_price } = idea[0][0]
        // user_id(작성자)로 해당 user nicknaem, user grade 찾기
        let upload_user = await conn.query(SELECT_UPLOAD_USER_INFO, [idea[0][0].user_id])
        const { user_nickname, user_grade } = upload_user[0][0]

        await conn.beginTransaction()
        // 뽑은 user point(사용자) 차감하기 (일단 300 포인트라고 가정)
        let update_point = await conn.query(UPDATE_USER_POINT, [user_id])
        console.log(update_point[0])
        // 뽑은 내역 저장
        await conn.query(INSERT_PICK_HISTORY, [user_id, idea_id, today])
        // 해당 idea_id에 해당하는 정보 보내주기
        console.log(`lot idea success`)
        res.status(200).json({'msg': 'idea short info', idea_title, idea_price, user_nickname, user_grade})
        await conn.commit()
    } catch(e) {
        await conn.rollback()
        console.log(`idea short info e : ${e}`)
        res.status(400).json({'msg' : 'idea short info error'})
    } finally {
        await conn.release()
    }
}