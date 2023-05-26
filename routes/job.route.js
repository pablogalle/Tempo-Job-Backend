const express = require('express');
const jobCtrl = require('../controllers/job.controller');
const router = express.Router();

router.get('/', jobCtrl.getJobs);
router.get('/:jobId', jobCtrl.getJobById);
router.post('/', jobCtrl.insertJob);
router.delete('/:jobId', jobCtrl.deleteJobById)

router.get('/userJobs/:userId', jobCtrl.getJobsByUserId)

module.exports = router;