const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        max: 60
    },
    city: {
        type: String,
        max: 60
    },
    from: {
        type: String,
        max: 60
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3]
    },
}, { timestamps: true })

module.exports = model("User", userSchema)