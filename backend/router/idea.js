const express = require("express")
const router = express.Router()
const { verifyToken } = require('./middleware')
const { categoryAPI } = require('../controller/idea/category')
const { registerAPI } = require('../controller/idea/register')
const { buyAPI, gradeAPI } = require('../controller/idea/buy')

router.get('/:category', verifyToken, categoryAPI) // 카테고리 선택 후 뽑으면 랜덤으로 1개를 보내준다(간단한내용), 포인트도 차감됨
router.post('/register', verifyToken, registerAPI) // 아이디어 등록
router.post('/buy', verifyToken, buyAPI) // 구매 내역에 저장, 디테일을 보여준다
router.post('/grade', verifyToken, gradeAPI)  // 구매 후 별점

module.exports = router