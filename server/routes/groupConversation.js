const GroupConversation = require('../model/GroupConversation')

const router = require('express').Router()

//new conversation
router.post('/', async (req, res) => {
    const { body: {id, name, desc} } = req

    const newConversation = new GroupConversation({
        name: name,
        desc: desc,
        members: [id]
    })

    try {
        await newConversation.save()
        res.status(201).json(newConversation)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/:id/add', async(req, res)=>{
    const {body:{userId}} = req
    await GroupConversation.findByIdAndUpdate({
        $push:{members: userId}
    })

    res.status(200).send('user has been added')
})

router.put('/:id/remove', async(req, res)=>{
    const {body:{userId}} = req
    await GroupConversation.findByIdAndUpdate({
        $pull:{members: userId}
    })

    res.status(200).send('user has been added')
})




router.get('/:id', async (req, res) => {
    const { params: { id } } = req
    try {
        const conversation = await GroupConversation.find({
            members: { $in: [id] }
        })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).send(error)
    }
})


//conversation include all userId
router.get('/find/', async (req, res) => {

    const { params: { firstId, secondId } } = req
    let users = []
    try {
        const conversation = await GroupConversation.findOne({
            members: { $all: users }
        })

        res.status(200).send(conversation)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router