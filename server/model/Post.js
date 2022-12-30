const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    userId: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        max: 600
    },
    img: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    }
},{timestamps: true})

module.exports = model('Post', postSchema)