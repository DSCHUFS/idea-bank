const express = require('express')
const pool = require('./config/dbPool')
const authRouter = require('./router/auth')
const ideaRouter = require('./router/idea')
const mypageRouter = require('./router/mypage')
const app = express()
app.use(express.json())
app.use(pool)

app.use('/auth', authRouter)
app.use('/idea', ideaRouter) // TODO: file 받기
app.use('/mypage', mypageRouter)
// TODO : Mainpage에 띄울 것

app.use('/', function(req, res) {
    res.status(200).json({'msg' : 'success'})
})

app.listen(3001, () => {
    console.log("App is running on port 3001")
})