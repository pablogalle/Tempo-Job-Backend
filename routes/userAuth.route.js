const express = require('express');
const authCtrl = require('../controllers/userAuth.controller');
const router = express.Router();

router.post('/authenticate', authCtrl.getUserAuth);


module.exports = router;