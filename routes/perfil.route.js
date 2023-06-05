const express = require('express');
const perfilCtrl = require('../controllers/perfil.controller');
const router = express.Router();

router.get('/users', perfilCtrl.getUsers);
router.get('/users/:id', perfilCtrl.getUserById);
router.post('/users', perfilCtrl.addUser);

module.exports = router;