const User = require('../model/user.model');

//Create new user pack 
const createUser = async (req, res) => {
    //catching data from front end to these attributes
    const { firstName, lastName, nic, email, langType, telNo, password } = req.body;

    //create a object to store saved data to save in the mongo db database
    const user = new User({
        firstName,
        lastName,
        nic,
        email,
        langType,
        telNo,
        password,
        roles: ["user"]
    });

    //sending created user pack object to the database 
    await user.save()
        .then(() => res.json('User has been created.'))
        .catch(err => res.status(400).json('Error : ' + err));
};

//Delete user pack by id
const deleteUser = async (req, res) => {
    console.log("DEL func: " + req.params.id);
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('user profile has been Deleted'))
        .catch(err => res.status(400).json('Error : ' + err));
}

//get user info by id
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user)
            res.json(user)
        else {
            res.json("No user profile record in the database!");
        }
    } catch (error) {
        res.status(500).send("Server Error" + error);
    }
};

//get all user records
const getUser = async (req, res) => {
    try {
        const user = await User.find();
        res.json(user)
    } catch (error) {
        res.status(500).send("Server Error : " + error);
    }
}

//Update Exsisting Ticket record
const updateUser = async (req, res) => {
    User.findByIdAndUpdate(req.params.id).
        then((exsistingUser) => {
            exsistingUser.firstName = req.body.username;
            exsistingUser.lastName = req.body.company;
            exsistingUser.nic = req.body.nic;
            exsistingUser.email = req.body.email;
            exsistingUser.langType = req.body.langType;
            exsistingUser.telNo = req.body.telNo;

            if (req.body?.password)
                exsistingUser.password = req.body.password;

            exsistingUser.save()
                .then((updatedUser) => res.json(updatedUser))
                .catch((error) => res.status(400).json("Error: " + error));
        })
        .catch((error) => res.status(400).json("Error (update) : " + error));
};

//export 
module.exports = {
    createUser,
    deleteUser,
    getUserById,
    getUser,
    updateUser,
};

