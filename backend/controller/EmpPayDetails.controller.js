const EmployeePaymentDetailsModel = require('../model/EmployeePaymentDetails.model');

//Create new EmpPayDetails 
const createEmpPayDetails = async (req, res) => {
    //catching data from front end to these attributes
    const { employeeId, accHolderName, accNumber, bankName, bankBranchName } = req.body;

    //create a object to store saved data to save in the mongo db database
    const empPayDetails = new EmployeePaymentDetailsModel({
        employeeId,
        accHolderName,
        accNumber,
        bankName,
        bankBranchName
    });

    //sending created EmpPayDetails object to the database 
    await empPayDetails.save()
        .then(() => res.json('EmpPayDetails has been Placed.'))
        .catch(err => res.status(400).json('Error : ' + err));
};

//Delete EmpPayDetails by id
const deleteEmpPayDetails = async (req, res) => {
    console.log("DEL func: " + req.params.id);
    EmployeePaymentDetailsModel.findByIdAndDelete(req.params.id)
        .then(() => res.json('EmpPayDetails has been Deleted'))
        .catch(err => res.status(400).json('Error : ' + err));
}

//get EmpPayDetails info by id
const getEmpPayDetailsById = async (req, res) => {
    try {
        const empPayDetails = await EmployeePaymentDetailsModel.findOne({ employeeId: req.params.id });
        if (empPayDetails)
            res.status(200).json(empPayDetails)
        else {
            res.sendStatus(204)
        }
    } catch (error) {
        res.status(500).send("Server Error" + error);
    }
};

//get all EmpPayDetails records
const getEmpPayDetails = async (req, res) => {
    try {
        const empPayDetails = await EmployeePaymentDetailsModel.find();
        res.json(empPayDetails)
    } catch (error) {
        res.status(500).send("Server Error : " + error);
    }
}

//Update Exsisting Ticket record
const updateEmpPayDetails = async (req, res) => {
    EmployeePaymentDetailsModel.findByIdAndUpdate(req.params.id).
        then((exsistingEmpPayDetails) => {
            exsistingEmpPayDetails.employeeId = req.body.employeeId;
            exsistingEmpPayDetails.accHolderName = req.body.accHolderName;
            exsistingEmpPayDetails.accNumber = req.body.accNumber;
            exsistingEmpPayDetails.bankName = req.body.bankName;
            exsistingEmpPayDetails.bankBranchName = req.body.bankBranchName;
            exsistingEmpPayDetails.approved = req.body.approved;
            exsistingEmpPayDetails.save()
                .then((updatedEmpPayDetails) => res.json(updatedEmpPayDetails))
                .catch((error) => res.status(400).json("Error: " + error));
        })
        .catch((error) => res.status(400).json("Error (update) : " + error));
};

//export 
module.exports = {
    createEmpPayDetails,
    deleteEmpPayDetails,
    getEmpPayDetailsById,
    getEmpPayDetails,
    updateEmpPayDetails
};

