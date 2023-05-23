const UserProfile = require('../models/perfil.model');
const UserAuth = require('../models/userAuth.model');
const userCtrl = {};


userCtrl.getUsers = async (req, res) => {
    const users = await UserProfile.find()
        .then((data) => res.json(data))
        .catch((err) => console.log(err));
}

userCtrl.getUserById = async (req, res) => {
    const user = await UserProfile.findById(req.params.id)
        .then((data) => {
            if (data != null) res.json(data)
            else res.json({message: "UserProfile doesn't exist"})
        })
        .catch(err => console.log(err));

}

userCtrl.addUser = async (req, res) => {
    try {
        const myUser = new UserProfile(req.body);
        const existingUser = await UserProfile.findOne({
            $or: [{username: myUser.username}, {email: myUser.email}]
        });
        if (existingUser) {
            return res.status(400).json({message: 'Username or Email already registered'});
        }

        const savedUser = await myUser.save();

        const myUserAuth = new UserAuth({
            username: savedUser.username,
            password: savedUser.password,
            userDataId: savedUser.id
        });
        await myUserAuth.save();

        res.status(200).json(myUserAuth)
    } catch (error) {
        res.status(500).json({error: error.message})
    }

}

module.exports = userCtrl;

// ----------------------------------------------------------------------------------------


/**
 userCtrl.addSerie = async (req, res) => {
    const mySerie = new UserProfile(req.body);
    await mySerie.save()
        .then(() => {
            res.json({message: 'UserProfile Successfully Inserted'})
        })
        .catch(err => res.send(err.message));
}

 userCtrl.getSerieName = async (req, res) => {
    const serie = await UserProfile.find({title: req.params.name})
        .then((data) => {
            if (data != null) res.json(data)
            else res.json({message: "UserProfile doesn't exist"})
        })
        .catch(err => console.log(err));

}

 // TODO -------------
 userCtrl.getSeriesGenre = async (req, res) => {
    const series = await UserProfile.find({ "genres.name" : req.params.genre})
        .then((data) => {
            if (data != null) res.json(data)
            else res.json({message: "Genre doesn't exist"})
        })
        .catch(err => console.log(err));
}

 userCtrl.updateSerie = async (req, res) => {
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
 userCtrl.deleteSerie = async (req, res) => {
    await UserProfile.findByIdAndDelete(req.params.id)
        .then((data) => {
            if (data != null) res.json({message: 'Interfaces Successfully Deleted'})
            else res.json({message: "UserProfile doesn't exist"})
        })
        .catch(err => res.send(err.message));
}
 userCtrl.getGenres = async (req, res) => {
    await UserProfile.find().distinct('genres')
        .then((data) => res.json(data))
        .catch((err) => console.error(err))
} **/

