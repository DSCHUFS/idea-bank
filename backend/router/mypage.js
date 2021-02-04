const express = require("express")
const router = express.Router()
const { verifyToken } = require('./middleware')
const { mypageAPI } = require('../controller/mypage')

router.get('', verifyToken, mypageAPI)

module.exports = router