const SpaceProvider = require('../model/spaceProvider.model');

//Create new spaceProvider pack 
const createSpaceProvider = async (req, res) => {
    //catching data from front end to these attributes
    const { firstName, email, serviceType, telNo, nic, password, lastName } = req.body;

    //create a object to store saved data to save in the mongo db serviceType
    const spaceProvider = new SpaceProvider({
        firstName,
        lastName,
        email,
        serviceType,
        telNo,
        nic,
        password
    });

    //sending created spaceProvider pack object to the database 
    await spaceProvider.save()
        .then(() => res.json('SpaceProvider has been created.'))
        .catch(err => res.status(400).json('Error : ' + err));
};

//Delete spaceProvider pack by id
const deleteSpaceProvider = async (req, res) => {
    console.log("DEL func: " + req.params.id);
    SpaceProvider.findByIdAndDelete(req.params.id)
        .then(() => res.json('spaceProvider profile has been Deleted'))
        .catch(err => res.status(400).json('Error : ' + err));
}

//get spaceProvider info by id
const getSpaceProviderById = async (req, res) => {
    try {
        const spaceProvider = await SpaceProvider.findById(req.params.id);
        if (spaceProvider)
            res.json(spaceProvider)
        else {
            res.json("No spaceProvider profile record in the database!");
        }
    } catch (error) {
        res.status(500).send("Server Error" + error);
    }
};

//get all spaceProvider records
const getSpaceProvider = async (req, res) => {
    try {
        const spaceProvider = await SpaceProvider.find();
        res.json(spaceProvider)
    } catch (error) {
        res.status(500).send("Server Error : " + error);
    }
}

//Update Exsisting Ticket record
const updateSpaceProvider = async (req, res) => {
    SpaceProvider.findByIdAndUpdate(req.params.id).
        then((exsistingSpaceProvider) => {
            exsistingSpaceProvider.firstName = req.body.firstName;
            exsistingSpaceProvider.email = req.body.email;
            exsistingSpaceProvider.serviceType = req.body.serviceType;
            exsistingSpaceProvider.telNo = req.body.telNo;
            exsistingSpaceProvider.lastName = req.body.lastName;
            exsistingSpaceProvider.nic = serviceTypeq.body.serviceType

            if (req.body?.password)
                exsistingSpaceProvider.password = req.body.password;

            exsistingSpaceProvider.save()
                .then((updatedSpaceProvider) => res.json(updatedSpaceProvider))
                .catch((error) => res.status(400).json("Error: " + error));
        })
        .catch((error) => res.status(400).json("Error (update) : " + error));
};

//export 
module.exports = {
    createSpaceProvider,
    deleteSpaceProvider,
    getSpaceProviderById,
    getSpaceProvider,
    updateSpaceProvider
};

