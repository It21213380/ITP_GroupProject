const GuidePack = require('../model/guidePack.model');

//Create new guide pack 
const createGuidePack = async (req, res) => {
    //catching data from front end to these attributes
    const {guideName, touristArea, langType, vehicleType, price} = req.body;

    //create a object to store saved data to save in the mongo db database
    const guidePack = new GuidePack({
        guideName,
        touristArea,
        langType,
        vehicleType,
        price
    });

    //sending created guide pack object to the database 
    await guidePack.save()
        .then(() => res.json('Guide Package has been Placed.'))
        .catch(err => res.status(400).json('Error : ' + err));
};

//Delete guide pack by id
const deleteGuidePack = async (req, res) => {
    console.log("DEL func: " + req.params.id);
    GuidePack.findByIdAndDelete(req.params.id)
        .then(() => res.json('guide package has been Deleted'))
        .catch(err => res.status(400).json('Error : ' + err));
}

//get guide package info by id
const getGuidePackById = async (req, res) => {
    try {
        const guidePack = await GuidePack.findById(req.params.id);
        if (guidePack)
            res.json(guidePack)
        else {
            res.json("No guide package record in the database!");
        }
    } catch (error) {
        res.status(500).send("Server Error" + error);
    }
};

//get all guide package records
const getGuidePack = async (req, res) => {
    try {
        const guidePack = await GuidePack.find();
        res.json(guidePack)
    } catch (error) {
        res.status(500).send("Server Error : " + error);
    }
}

//Update Exsisting Ticket record
const updateGuidePack = async (req, res) => {
    GuidePack.findByIdAndUpdate(req.params.id).
        then((exsistingGuidePack) => {

            exsistingGuidePack.guideName = req.body.guideName;
            exsistingGuidePack.touristArea = req.body.touristArea;
            exsistingGuidePack.langType = req.body.langType;
            exsistingGuidePack.vehicleType = req.body.vehicleType;
            exsistingGuidePack.price = req.body.price;
            exsistingGuidePack.save()
                .then((updatedGuidePack) => res.json(updatedGuidePack))
                .catch((error) => res.status(400).json("Error: " + error));
        })
        .catch((error) => res.status(400).json("Error (update) : " + error));
};

//export 
module.exports = {
    createGuidePack,
    deleteGuidePack,
    getGuidePackById,
    getGuidePack,
    updateGuidePack
};

