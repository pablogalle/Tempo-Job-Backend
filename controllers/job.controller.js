const Job = require('../models/job.model');
const UserProfile = require("../models/perfil.model");

const jobCtrl = {};

jobCtrl.getJobs = async (req, res) => {
    const jobs = await Job.find()
        .then((data) => res.json(data))
        .catch((err) => console.log(err));
}
jobCtrl.getJobById = async (req, res) => {
    const job = await Job.findById(req.params.jobId)
        .then((data) => {
            if (data != null) res.json(data)
            else res.json({message: "Job doesn't exist"})
        })
        .catch(err => console.log(err));
}

jobCtrl.insertJob =  async (req, res) => {
    const myJob = new Job(req.body);
    await myJob.save()
        .then(() => {
            res.json({message: 'Job Successfully Created'})
        })
        .catch(err => res.send(err.message));
}

jobCtrl.getJobsByUserId = async (req, res) => {
    const series = await Job.find({ "creator.unserId" : req.params.userId})
        .then((data) => {
            if (data != null) res.json(data)
            else res.json({message: "Genre doesn't exist"})
        })
        .catch(err => console.log(err));
}

jobCtrl.deleteJobById = async (req, res) => {
    await Job.findByIdAndDelete(req.params.jobId)
        .then((data) => {
            if (data != null) res.json({message: 'Job Successfully Deleted'})
            else res.json({message: "Job with recieved id doesn't exist"})
        })
        .catch(err => res.send(err.message));
}

module.exports = jobCtrl;