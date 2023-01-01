const { Schema, model } = require('mongoose')

const groupConversationSchema = new Schema({
    name: {type: String},
    desc:{type: String},
    members: {
        type: Array
    }
}, { timestamps: true })

module.exports = model('GroupConversation', groupConversationSchema)