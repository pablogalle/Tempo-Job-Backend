const mongoose = require('mongoose');
const {Schema} = mongoose;

const userProfileSchema = new Schema({
    email: {type: String, required: true},
    username: {type: String, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    password: {type: String, required: true},
    birth_date: {type: Date, required: true},
    scores: [{
        username:{type: String, required: true},
        score:{type:Number, required:true}
    }]
});

module.exports = mongoose.model('UserProfile', userProfileSchema, 'users')