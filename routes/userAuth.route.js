const express = require('express');
const serieCtrl = require('../controllers/userAuth.controller');
const router = express.Router();

router.post('/authenticate', serieCtrl.getUserAuth);


module.exports = router;