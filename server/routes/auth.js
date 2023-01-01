const router = require('express').Router()
const { hash, genSalt, compare } = require('bcrypt')
const User = require('../model/User')
const jwt = require('jsonwebtoken')
require('dotenv/config')

//REGISTER
router.post('/register', async (req, res) => {
    const salt = await genSalt(10)
    const hashed = await hash(req.body.password, salt)
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
        phoneno: req.body.phoneno
    })

    try {
        const user = await newUser.save()
        res.status(201).send(user)
    } catch (error) {
        console.log(error)
    }
})

//LOGIN
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(404).send('user not found')

    const valid = await compare(req.body.password, user.password)
    if (!valid) return res.status(400).send('invalid password')

    const token = jwt.sign({id: user._id}, process.env.TOKEN, {expiresIn:"24h"})

    const { password, updatedAt, ...other } = user._doc
    res.status(200).send(other)
})

module.exports = router