const mongoose = require('mongoose');
const {Schema} = mongoose;

const jobSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    creator: {
        userId: { type: String, required: true },
        username: { type: String, required: true }
    },
    date_of_creation: {type: Date, require: true }
});

module.exports = mongoose.model('Job', jobSchema, 'jobs')