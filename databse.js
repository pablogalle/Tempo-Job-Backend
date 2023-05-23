const mongoose = require('mongoose');

const URI = 'mongodb+srv://pablogalle:ZyIVohYoPrTqgOP1@tempojobcluster.ngrbitf.mongodb.net/TempoJob?retryWrites=true&w=majority'

mongoose.connect(URI)
.then(db => console.log('DB connected'))
.catch(err => console.log(err));

module.exports = mongoose;