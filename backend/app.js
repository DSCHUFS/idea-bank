const express = require('express')
const pool = require('./config/dbPool')
const authRouter = require('./router/auth')
const app = express()
app.use(express.json())
app.use(pool)

app.use('/auth', authRouter) // signin, signup
// app.use('/idea') // :id(get), detail/:id, register(post), buy/:id(get)
// app.use('/mypage') // get

app.use('/', function(req, res) {
    res.status(200).json({'msg' : 'success'})
})

app.listen(3001, () => {
    console.log("App is running on port 3001")
})