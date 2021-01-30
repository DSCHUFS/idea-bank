const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment')

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
        result = jwt.sign({ id: user_id }, secretKey, { expiresIn: '30d'})
    } catch(e) {
        result =  false
    }
    return result
}

exports.getToday = async() => {
    let result = ''
    try{
        result = moment().format('YYYY-MM-DD')
    } catch(e) {
        result =  false
    }
    return result
}

exports.minusArray = async(arr1, arr2) => {
    let result = ''
    try{
        arr1 = arr1.filter(val => !arr2.includes(val))
        result = arr1
    } catch(e) {
        result = false
    }
    return result
}

exports.getRandomNo = async(n) => {
    // 0 ~ n-1 사이 정수 중 하나 
    let result = ''
    try{
        result = Math.floor(Math.random() * n)
    } catch(e) {
        result = false
    }
    return result
}

exports.exportsValue = async(objList, key) => {
    let result = ''
    try{
        result = objList.map(obj => obj[key])
    } catch(e) {
        result = false
    }
    return result
}