const express = require('express');
const perfilCtrl = require('../controllers/perfil.controller');
const router = express.Router();

router.get('/users', perfilCtrl.getUsers);
router.get('/users/:id', perfilCtrl.getUserById);
router.post('/users', perfilCtrl.addUser);

/**
router.get('/seriesgenre/:genre', perfilCtrl.getSeriesGenre);
router.get('/seriename/:name', perfilCtrl.getSerieName);
router.post('/', perfilCtrl.addSerie);
router.put('/:id', perfilCtrl.updateSerie);
router.delete('/:id', perfilCtrl.deleteSerie);

router.get('/genres', perfilCtrl.getGenres);
 **/

module.exports = router;