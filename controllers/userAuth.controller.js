const UserAuth = require('../models/userAuth.model');

const authCtrl = {};

authCtrl.getUserAuth = async (req, res) => {
    const userToAuth = new UserAuth(req.body);
    const userAuth = await UserAuth.findOne({username: userToAuth.username})
        .then((data) => {
            if (!data) {
                res.status(401).json({message: "Authentication failed"})
                return;
            }
            if (data.password === userToAuth.password)
                res.status(200).json(data)
            else res.status(401).json({message: "Authentication failed"})
        })
        .catch(err => console.log(err));

}
module.exports = authCtrl;