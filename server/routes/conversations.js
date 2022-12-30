const router = require('express').Router()
const Conversation = require('../model/Conversation')


//new conversation
router.post('/', async (req, res) => {
    const { body: { senderId, receiverId } } = req

    const newConversation = new Conversation({
        members: [senderId, receiverId]
    })

    try {
        await newConversation.save()
        res.status(201).json(newConversation)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/:id', async (req, res) => {
    const { params: { id } } = req
    try {
        const conversation = await Conversation.find({
            members:{$in: [id]}
        })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router