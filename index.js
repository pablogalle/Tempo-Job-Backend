const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const {mongoose} = require('./databse');
const {json} = require('express');

// Settings
app.set('port', process.env.PORT || 3000);

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/userAuth.route'));
app.use('/api/jobs', require('./routes/job.route'));
app.use('/api/chats', require('./routes/chats.route'));
app.use('/api/', require('./routes/perfil.route'));
app.use('/',(req, res) => res.send('API in /api'));

// Start the server
app.listen(app.get('port'), () => {
    console.log('Server on port: ', app.get('port'));
})