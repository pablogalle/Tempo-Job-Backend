const express = require('express');
const jobCtrl = require('../controllers/job.controller');
const router = express.Router();

router.get('/', jobCtrl.getJobs);
router.post('/', jobCtrl.insertJob);

router.get('/:userId', jobCtrl.getJobsByUserId)

module.exports = router;