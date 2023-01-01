const { Schema, model } = require('mongoose')

const messageSchema = new Schema({
    conversationId: { type: String, },
    sender: { type: String },
    text: { type: String },
    img: { type: String }
}, { timestamps: true })

module.exports = model('Message', messageSchema)