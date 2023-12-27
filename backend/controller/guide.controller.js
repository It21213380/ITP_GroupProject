const Guide = require('../model/guide.model');

//Create new guide pack 
const createGuide = async (req, res) => {
    //catching data from front end to these attributes
    const {guideName, email, langType, serviceType, mobileNumber, address, nic} = req.body;

    //create a object to store saved data to save in the mongo db database
    const guide = new Guide({
        guideName,
        email,
        langType,
        serviceType,
        mobileNumber,
        address,
        nic
    });

    //sending created guide pack object to the database 
    await guide.save()
        .then(() => res.json('Guide has been created.'))
        .catch(err => res.status(400).json('Error : ' + err));
};

//Delete guide pack by id
const deleteGuide = async (req, res) => {
    console.log("DEL func: " + req.params.id);
    Guide.findByIdAndDelete(req.params.id)
        .then(() => res.json('guide profile has been Deleted'))
        .catch(err => res.status(400).json('Error : ' + err));
}

//get guide info by id
const getGuideById = async (req, res) => {
    try {
        const guide = await Guide.findById(req.params.id);
        if (guide)
            res.json(guide)
        else {
            res.json("No guide profile record in the database!");
        }
    } catch (error) {
        res.status(500).send("Server Error" + error);
    }
};

//get all guide records
const getGuide = async (req, res) => {
    try {
        const guide = await Guide.find();
        res.json(guide)
    } catch (error) {
        res.status(500).send("Server Error : " + error);
    }
}

//Update Exsisting Ticket record
const updateGuide = async (req, res) => {
    Guide.findByIdAndUpdate(req.params.id).
        then((exsistingGuide) => {

            exsistingGuide.guideName = req.body.guideName;
            exsistingGuide.email = req.body.email;
            exsistingGuide.langType = req.body.langType;
            exsistingGuide.serviceType = req.body.serviceType;
            exsistingGuide.mobileNumber = req.body.mobileNumber;
            exsistingGuide.address = req.body.address;
            exsistingGuide.nic = req.body.nic;
            exsistingGuide.save()
                .then((updatedGuide) => res.json(updatedGuide))
                .catch((error) => res.status(400).json("Error: " + error));
        })
        .catch((error) => res.status(400).json("Error (update) : " + error));
};

//export 
module.exports = {
    createGuide,
    deleteGuide,
    getGuideById,
    getGuide,
    updateGuide
};

