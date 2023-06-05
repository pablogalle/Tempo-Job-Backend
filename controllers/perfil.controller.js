const bcrypt = require('bcrypt');
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
        const  salt = await bcrypt.genSalt(10);
        myUser.password = await bcrypt.hash(myUser.password, salt);
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

    userCtrl.updateUser = async (req, res) => {
        const userUpdate = req.body;
        await UserProfile.findByIdAndUpdate(
            req.params.id,
            {$set: userUpdate},
            {new: true}
        )
            .then((data) => {
                if (data != null) res.json({message: 'User Successfully Updated'})
                else res.json({message: "User doesn't exist"})
            })
            .catch(err => res.send(err.message));
    }

}

module.exports = userCtrl;