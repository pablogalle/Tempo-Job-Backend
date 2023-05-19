const mongoose = require('mongoose');
const {Schema} = mongoose;

const userAuthSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
});

module.exports = mongoose.model('UserAuth', userAuthSchema, 'userAuth')