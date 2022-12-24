const router = require('express').Router()
const Post = require('../model/Post')
const User = require('../model/User')

//create a post
router.post('/', async (req, res) => {
    const newPost = new Post(req.body)

    const savedpost = await newPost.save()

    return res.status(201).send(newPost)
})

//udpate a post
router.put('/:id', async (req, res) => {
    const { params: { id }, body: { userId } } = req

    const post = await Post.findById(id)
    if (post.userId == userId) {
        await post.updateOne({ $set: req.body })
        res.status(200).send('post updated')
    } else {
        return res.status(403).json('you can only edit posgt on your account')
    }
})

//delete a post
router.delete('/:id', async (req, res) => {
    const { params: { id }, body: { userId } } = req

    const post = await Post.findById(id)
    if (post.userId == userId) {
        await post.deleteOne()
        res.status(200).send('post deleted')
    } else {
        return res.status(403).json('you can only delete post on your account')
    }
})
//like a post
router.put('/:id/like', async (req, res) => {
    const { params: { id }, body: { userId } } = req
    const post = await Post.findById(id)

    if (!post.likes.includes(userId)) {
        await post.updateOne({ $push: { likes: userId } })
        res.status(200).send('post has been liked')
    } else {
        await post.updateOne({ $pull: { likes: userId } })
        res.status(200).send('posgt has been unliked')
    }
})
//get a post
router.get('/:id', async (req, res) => {
    const { params: { id } } = req
    const post = await Post.findById(id)
    res.status(200).send(post)
})


// get timeline post
router.get('/timeline/all', async (req, res) => {
    const { params: { id }, body: { userId } } = req
    const currentUser = await User.findById(userId)

    const userPosts = await Post.find({userId: currentUser._id})
    const friendPosts = await Promise.all(
        currentUser.followings.map((friendId)=>{
            return Post.find({userId: friendId})
        })
    )
    res.json(userPosts.concat(...friendPosts))
})

module.exports = router