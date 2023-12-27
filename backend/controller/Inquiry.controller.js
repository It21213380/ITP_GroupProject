const Inquiry = require('../model/Inquiry.model');

//Create new Inquiry 
const createInquiry = async (req, res) => {
    //catching data from front end to these attributes
    const { CusName, type, description, contactNum, address, date ,status} = req.body;

    //create a object to store saved data to save in the mongo db database
    const inquiry = new Inquiry({
        CusName,
        type,
        description,
        contactNum,
        address,
        date,
        status
    });

    //sending created Inquiry object to the database 
    await inquiry.save()
        .then(() => res.json('Inquiry has been Placed.'))
        .catch(err => res.status(400).json('Error : ' + err));
};

//Delete Inquiry by id
const deleteInquiry = async (req, res) => {
    console.log("DEL func: " + req.params.id);
    Inquiry.findByIdAndDelete(req.params.id)
        .then(() => res.json('Inquiry has been Deleted'))
        .catch(err => res.status(400).json('Error : ' + err));
}

//get Inquiry info by id
const getInquiryById = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);
        if (inquiry)
            res.json(inquiry)
        else {
            res.json("No inquiry record in the database!");
        }
    } catch (error) {
        res.status(500).send("Server Error" + error);
    }
};

//get all Inquiry records
const getInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.find();
        res.json(inquiry)
    } catch (error) {
        res.status(500).send("Server Error : " + error);
    }
}

//Update Exsisting Ticket record
const updateInquiry = async (req, res) => {
    Inquiry.findByIdAndUpdate(req.params.id).
        then((exsistingInquiry) => {
            exsistingInquiry.CusName = req.body.CusName;
            exsistingInquiry.type = req.body.type;
            exsistingInquiry.description = req.body.description;
            exsistingInquiry.contactNum = req.body.contactNum;
            exsistingInquiry.address = req.body.address;
            exsistingInquiry.date = Date.parse(req.body.date);
            exsistingInquiry.status = req.body.status;
            exsistingInquiry.save()
                .then((updatedInquiry) => res.json(updatedInquiry))
                .catch((error) => res.status(400).json("Error: " + error));
        })
        .catch((error) => res.status(400).json("Error (update) : " + error));
};

//export 
module.exports = {
    createInquiry,
    deleteInquiry,
    getInquiryById,
    getInquiry,
    updateInquiry
};

