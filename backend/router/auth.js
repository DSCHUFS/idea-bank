const express = require("express")
const router = express.Router()
const { signupAPI, signinAPI } = require('../controller/auth')

router.post('/signup', signupAPI)
router.post('/signin', signinAPI)

module.exports = router