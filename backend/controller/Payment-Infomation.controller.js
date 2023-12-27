const { default: PaymentInformation } = require('../model/PaymentInformationModel');
const Payment = require('../model/PaymentInformationModel');







































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































//Create new payment] 
const createPayment = async (req, res) => {

    //catching data from front end to these attributes
    if (!req.body) return

    //catching data from front end to these attributes
    const { accHoldersName, accNumber, BankName, BankBranchName, uid, serviceType, approval} = req.body;

    //create a object to store saved data to save in the mongo db database
    const payment = new PaymentInformation ({
        accHoldersName, accNumber, BankName, BankBranchName,
        uid, serviceType, approval
    });

    //sending created ticket object to the database 
    console.log(payment)
    console.log(req?.body)
    await payment.save()
        .then(() => res.json('New Payment has been created.'))
        .catch(err => res.status(400).json('Error : ' + err));
};

//Delete Ticket by id
const deletePayment = async (req, res) => {
    console.log(req.params.id);
    Payment.findByIdAndDelete(req.params.id)
        .then(() => res.json('Payment Package has been Deleted'))
        .catch(err => res.status(400).json('Error : ' + err));
}

//get ticket info by id
const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (payment)
            res.json(payment)
        else {
            res.json("No Payment record in the database!");
        }
    } catch (error) {
        res.status(500).send("Server Error" + error);
    }
};

//get all ticket records
const getPayment = async (req, res) => {
    try {
        const payment = await Payment.find();
        res.json(payment)
    } catch (error) {
        res.status(500).send("Server Error : " + error);
    }
}

//Update Exsisting Ticket record
const updatePayment = async (req, res) => {
    Payment.findByIdAndUpdate(req.params.id).
        then((exsistingPayment) => {
            existingPayment.nameOnCard = req.body.nameOnCard, 
            existingPayment.cardNumber = req.body.cardNumber, 
            existingPayment.cvvCode = req.body.cvvCode, 
            existingPayment.expiry = req.body.expiry, 
            existingPayment.streetAddress = req.body.streetAddress, 
            existingPayment.city = req.body.city, 
            existingPayment.state = req.body.state, 
            existingPayment.zipCode = req.body.zipCode
            exsistingPayment.save()
                .then((updatedPayment) => res.json(updatedPayment))
                .catch((error) => res.status(400).json("Error: " + error));
        })
        .catch((error) => res.status(400).json("Error: 1" + error));
};


//export 
module.exports = {
    createPayment,
    deletePayment,
    getPaymentById,
    getPayment,
    updatePayment
};