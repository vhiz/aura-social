const express = require('express')
const app = express()
const helmet = require('helmet')
const mongoose = require('mongoose')
require('dotenv/config')

//routes
const authroute = require('./routes/auth')
const userroute = require('./routes/user')
const postroute = require('./routes/post')

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGOURI, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('database connected')
    }
})

app.use(express.json())
app.use(helmet())

app.use('/auth', authroute)
app.use('/user', userroute)
app.use('/post', postroute)

const Port = process.env.PORT || 3001
app.listen(Port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`backend running on Port ${Port}`)
    }
})
