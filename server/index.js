const express = require('express')
const app = express()
const helmet = require('helmet')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv/config')
const path = require('path')
const multer = require('multer')



//routes
const authroute = require('./routes/auth')
const userroute = require('./routes/user')
const postroute = require('./routes/post')
const conversationroute = require('./routes/conversations')
const messageroute = require('./routes/messages')
const groupConverastion = require('./routes/groupConversation')

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGOURI, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('database connected')
    }
})

app.use("/images", express.static(path.join(__dirname, "./public/images")))

app.use(express.json())
app.use(helmet())
//app.use(morgan())
app.use(cors())

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "./public/images")
    },
    filename:(req, file, cb)=>{
        cb(null, req.body.name)
    }
})
const upload = multer({storage:storage})

app.post('/upload', upload.single('file'), (req, res)=>{
    try {
        res.status(200).send('upload sucess')
    } catch (error) {
        console.log(error.message)
    }
})

app.use('/auth', authroute)
app.use('/user', userroute)
app.use('/post', postroute)
app.use('/message', messageroute)
app.use('/conversation', conversationroute)
app.use('/groupconversation', groupConverastion)



const Port = process.env.PORT || 3001
app.listen(Port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`backend running on Port ${Port}`)
    }
})
