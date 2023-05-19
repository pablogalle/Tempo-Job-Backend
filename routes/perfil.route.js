const express = require('express');
const serieCtrl = require('../controllers/perfil.controller');
const router = express.Router();

router.get('/users', serieCtrl.getUsers);
router.get('/users/:id', serieCtrl.getUserById);



router.get('/seriesgenre/:genre', serieCtrl.getSeriesGenre);
router.get('/seriename/:name', serieCtrl.getSerieName);
router.post('/', serieCtrl.addSerie);
router.put('/:id', serieCtrl.updateSerie);
router.delete('/:id', serieCtrl.deleteSerie);

router.get('/genres', serieCtrl.getGenres);

module.exports = router;