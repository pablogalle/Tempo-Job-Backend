const mongoose = require('mongoose');

const URI = 'mongodb+srv://pablogalle:5I6e5waI2rKs29HU@tempojobcluster.ngrbitf.mongodb.net/TempoJob?retryWrites=true&w=majority'

mongoose.connect(URI)
.then(db => console.log('DB connected'))
.catch(err => console.log(err));

module.exports = mongoose;