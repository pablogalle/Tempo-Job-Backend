const UserProfile = require('../models/perfil.model');

const serieCtrl = {};


serieCtrl.getUsers = async (req, res) => {
    const users = await UserProfile.find()
        .then((data) => res.json(data))
        .catch((err) => console.log(err));
}

serieCtrl.getUserById = async (req, res) => {
    const user = await UserProfile.findById(req.params.id)
        .then((data) => {
            if (data != null) res.json(data)
            else res.json({message: "UserProfile doesn't exist"})
        })
        .catch(err => console.log(err));

}

// ----------------------------------------------------------------------------------------



serieCtrl.addSerie = async (req, res) => {
    const mySerie = new UserProfile(req.body);
    await mySerie.save()
        .then(() => {
            res.json({message: 'UserProfile Successfully Inserted'})
        })
        .catch(err => res.send(err.message));
}

serieCtrl.getSerieName = async (req, res) => {
    const serie = await UserProfile.find({title: req.params.name})
        .then((data) => {
            if (data != null) res.json(data)
            else res.json({message: "UserProfile doesn't exist"})
        })
        .catch(err => console.log(err));

}

// TODO -------------
serieCtrl.getSeriesGenre = async (req, res) => {
    const series = await UserProfile.find({ "genres.name" : req.params.genre})
        .then((data) => {
            if (data != null) res.json(data)
            else res.json({message: "Genre doesn't exist"})
        })
        .catch(err => console.log(err));
}

serieCtrl.updateSerie = async (req, res) => {
    const serie = req.body;
    await UserProfile.findByIdAndUpdate(
        req.params.id,
        {$set: serie},
        {new: true}
    )
        .then((data) => {
            if (data != null) res.json({message: 'Series Successfully Updated'})
            else res.json({message: "Series doesn't exist"})
        })
        .catch(err => res.send(err.message));


}
serieCtrl.deleteSerie = async (req, res) => {
    await UserProfile.findByIdAndDelete(req.params.id)
        .then((data) => {
            if (data != null) res.json({message: 'Interfaces Successfully Deleted'})
            else res.json({message: "UserProfile doesn't exist"})
        })
        .catch(err => res.send(err.message));
}
serieCtrl.getGenres = async (req, res) => {
    await UserProfile.find().distinct('genres')
        .then((data) => res.json(data))
        .catch((err) => console.error(err))
}


module.exports = serieCtrl;