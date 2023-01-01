const { genSalt, hash } = require('bcrypt')
const User = require('../model/User')

const router = require('express').Router()


//update a user
router.put('/:id', async (req, res) => {
    const { params: { id } } = req
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            const salt = await genSalt(10)
            req.body.password = await hash(req.body.password, salt)
        }

        try {
            const user = await User.findByIdAndUpdate(id, {
                $set: req.body
            })

            res.status(200).send(user)
        } catch (error) {
            res.status(500).send(error)
        }
    } else {
        return res.status(403).json('you can only upated your account')
    }
})


//delete a user
router.delete('/:id', async (req, res) => {
    const { params: { id } } = req
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(id)
            res.status(200).send("account has been deleted")
        } catch (error) {
            res.status(500).send(error)
        }
    } else {
        return res.status(403).json('you can only delete your account')
    }
})


//get a user
router.get('/:id', async (req, res) => {
    const { params: { id } } = req

    const user = await User.findById(id)
    if (!user) res.status(404).send('user not found')

    const { password, updatedAt, ...other } = user._doc
    res.status(200).send(other)
})

//get a user by username
router.get("/:username", async (req, res) => {
    const { params: { username } } = req
    try {
        const user = await User.findOne({ username: username });
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});
//follow a user
router.put('/:id/follow', async (req, res) => {
    const { params: { id }, body: { userId } } = req
    if (userId !== id) {
        const user = await User.findById(id)
        const currentUser = await User.findById(userId)

        if (!user.followers.includes(userId)) {
            await user.updateOne({ $push: { followers: userId } })
            await currentUser.updateOne({ $push: { followings: id } })
            return res.status(200).send('user has been followed')
        } else {
            res.status(401).send('you are already following this user')
        }
    } else {
        res.status(401).send('you cannot follow yourself')
    }
})

//unfollow a user
router.put('/:id/unfollow', async (req, res) => {
    const { params: { id }, body: { userId } } = req
    if (userId !== id) {
        const user = await User.findById(id)
        const currentUser = await User.findById(userId)

        if (user.followers.includes(userId)) {
            await user.updateOne({ $pull: { followers: userId } })
            await currentUser.updateOne({ $pull: { followings: id } })
            return res.status(200).send('user has been unfollowed')
        } else {
            res.status(401).send('you are already unfollowing this user')
        }
    } else {
        res.status(401).send('you cannot follow yourself')
    }
})

//get following of a user
router.get('/friend/:userId', async (req, res) => {
    const { params: { userId } } = req
    const currentUser = await User.findById(userId)

    const userFriends = await Promise.all(
        currentUser.followings.map(friendId => {
            return User.findById(friendId)
        })
    )

    let friendList = []
    userFriends.map(userFriend => {
        const { _id, profilePicture, username } = userFriend
        friendList.push({ _id, profilePicture, username })
    })

    res.status(200).json(friendList)
})


module.exports = router