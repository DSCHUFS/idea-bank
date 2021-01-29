const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const saltRounds = 10
const { secretKey } = require('./config/key')

exports.bcryptPW = async(pw) => {
    let result = ''
    try {
        result = bcrypt.hashSync(pw, saltRounds)
    } catch(e) {
        result = false
    }
    return result
}

exports.comparePW = async(pw, dbpw) => {
    let result = ''
    try {
        result = bcrypt.compareSync(pw, dbpw)
    } catch(e) {
        result = false
    }
    return result
}

exports.issueToken = async(user_id) => {
    let result = ''
    try{
        result = jwt.sign({ id: user_id }, secretKey, { expiresIn: '1m'})
    } catch(e) {
        result =  false
    }
    return result
}