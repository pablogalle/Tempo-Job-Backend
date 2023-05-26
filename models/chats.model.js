const mongoose = require('mongoose');
const {Schema} = mongoose;

const chatSchema = new Schema({
    users: {
        appliant: {
            username: {type: String, required: true},
            userId: {type: String, required: true}
        },
        contractor: {
            username: {type: String, required: true},
            userId: {type: String, required: true}
        }
    },
    messages: [{
        messageText: {type: String, required: true},
        senderUsername: {type: String, required: true},
        timeSent: {type: Date, required: true}
    }]
});


module.exports = mongoose.model('Chat', chatSchema, 'chats')