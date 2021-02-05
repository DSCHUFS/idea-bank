const { 
    INSERT_BUY_HISTORY, 
    SELECT_IDEA_DETAIL, 
    UPDATE_GRADE, 
    SELECT_WRITER_INFO, 
    UPDATE_USER_POINT_BUY 
} = require('../../query')
const { getToday } = require('../../lib')
exports.buyAPI = async(req, res) => {
    const conn = await res.pool.getConnection()
    try{
        const user_id = res.user_id
        const { idea_id } = req.body
        const buy_at = await getToday()
        await conn.beginTransaction()
        // BuyIdeas table에 history저장 
        await conn.query(INSERT_BUY_HISTORY, [user_id, idea_id, buy_at])
        
        // 해당 idea detail, 작성자정보 갖고오기
        let info = await conn.query(SELECT_IDEA_DETAIL, [idea_id])
        const idea_info = {... info[0][0]}
        let idea_price = idea_info.idea_price
        await conn.query(UPDATE_USER_POINT_BUY, [idea_price, user_id])
        console.log('buy success') //지우기
        res.status(200).json({'msg' : 'idea buy success', 'idea_info': idea_info})
        await conn.commit()
    } catch(e) {
        await conn.rollback()
        console.log(`idea buy e : ${e}`)
        res.status(400).json({'msg' : 'idea buy error'})
    } finally {
        await conn.release()
    }
}

exports.gradeAPI = async(req, res) => {
    const conn = await res.pool.getConnection()
    try{
        const user_id = res.user_id
        const { idea_id, grade } = req.body
        
        // BuyIdea table에 user_grade update
        await conn.beginTransaction()
        await conn.query(UPDATE_GRADE, [grade, idea_id, user_id])
        
        // 해당 idea 작성자 user_grade 수정하기
        let user_grade = await conn.query(SELECT_WRITER_INFO, [idea_id])
        let writer_id = user_grade[0][0].user_id
        user_grade = user_grade[0][0].user_grade

        if(user_grade) {
            user_grade = (grade + user_grade) / 2
        }
        
        await conn.query(UPDATE_USER_GRADE, [user_grade, writer_id])
        res.status(200).json({'msg' : 'grade update success'})  
        await conn.commit()
    } catch(e) {
        await conn.rollback()
        console.log(`idea grade e : ${e}`)
        console.log(e)
        res.status(400).json({'msg' : 'idea grade error'})
    } finally {
        await conn.release()
    }
}