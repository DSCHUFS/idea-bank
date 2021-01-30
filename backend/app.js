const express = require('express')
const pool = require('./config/dbPool')
const authRouter = require('./router/auth')
const ideaRouter = require('./router/idea')
const app = express()
app.use(express.json())
app.use(pool)

app.use('/auth', authRouter) // TODO: user 정보도 같이 넘겨주기
app.use('/idea', ideaRouter) // TODO: file 받기
// app.use('/mypage') // get

app.use('/', function(req, res) {
    res.status(200).json({'msg' : 'success'})
})

app.listen(3001, () => {
    console.log("App is running on port 3001")
})