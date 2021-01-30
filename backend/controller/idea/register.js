const { REGISTER_IDEA } = require('../../query')

exports.registerAPI = async(req, res) => {
    try{
        const user_id = res.user_id
        const { title, detail, price, category } = req.body 
        // TODO : file 받는 것
        await res.pool.query(REGISTER_IDEA, [user_id, title, detail, price, category])
        console.log(`idea register success`)
        res.status(200).json({'msg' : 'idea register success'})
    } catch(e) {
        console.log(`idea register e : ${e}`)
        res.status(400).json({'msg' : 'idea register error'})
    }
}