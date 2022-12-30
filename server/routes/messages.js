const router = require('express').Router()
const Message = require('../model/Message')
//add a meaasge
router.post('/', async(req, res)=>{
    const newMessage = new Message(req.body)
    try {
        await newMessage.save()
        res.status(201).json(newMessage)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/:conversationId', async(req, res)=>{
    const {params:{conversationId}} = req
    try {
        const message = await Message.find({
            conversationId:conversationId
        })

        res.status(200).json(message)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports= router