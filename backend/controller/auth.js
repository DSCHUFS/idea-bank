const { EMAIL_EXIST, INSERT_USER } = require('../query')
const { bcryptPW, comparePW, issueToken } = require('../lib')

exports.signupAPI = async(req, res) => {
    const conn = await res.pool.getConnection()
    try{
        const { email, password, nickname } = req.body
        let email_check = await conn.query(EMAIL_EXIST, [email])

        if(email_check[0].length === 0) {
            let b_password = await bcryptPW(password)
            await conn.beginTransaction()
            let result = await conn.query(INSERT_USER, [email, b_password, nickname])
            const user_id = result[0].insertId
            let token = await issueToken(user_id)
            if(!b_password || !token) throw e
            await conn.commit()
            console.log(`${email} signup success`)
            res.status(200).json({'msg' : 'signup success', 'token' : token})
        } else {
            res.status(400).json({'msg' : 'duplicated email'})
        }
    } catch(e) {
        await conn.rollback()
        console.log(`signup e : ${e}`)
        res.status(400).json({'msg' : 'signup error'})
    } finally {
        await conn.release()
    }
}

exports.signinAPI = async(req, res) => {
    try {
        const { email, password } = req.body
        let result = await res.pool.query(EMAIL_EXIST, [email])
        let {user_id, user_password} = result[0][0]
        
        let email_check = (result[0].length > 0)
        if(!email_check) {
            res.status(400).json({'msg' : 'signin failed'})
        } else {
            let c_password = await comparePW(password, user_password)
            if(!c_password) {
                res.status(400).json({'msg' : 'signin failed'})
            } else {
                let token = await issueToken(user_id)
                if(!token) throw e
                res.status(200).json({'msg' : 'signin success', 'token' : token})
            }
        }
    } catch(e) {
        console.log(`signin e : ${e}`)
        res.status(400).json({'msg' : 'signin error'})
    }
}