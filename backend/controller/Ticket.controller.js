const Ticket = require('../model/Tickets.model');

//Create new ticket 
const createTicket = async (req, res) => {
    //catching data from front end to these attributes
    const { firstName, lastName,passportID, phoneNumber, bookingDate, toLocation, price } = req.body;

    //create a object to store saved data to save in the mongo db database
    const ticket = new Ticket({
        firstName,
        lastName,
        passportID,
        phoneNumber,
        bookingDate,
        toLocation,
        price,
    });

    //sending created ticket object to the database 
    await ticket.save()
        .then(() => res.json('Ticket has been Booked.'))
        .catch(err => res.status(400).json('Error : ' + err));
};

//Delete Ticket by id
const deleteTicket = async (req, res) => {
    console.log(req.params.id);
    Ticket.findByIdAndDelete(req.params.id)
        .then(() => res.json('Ticket has been Deleted'))
        .catch(err => res.status(400).json('Error : ' + err));
}

//get ticket info by id
const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (ticket)
            res.json(ticket)
        else {
            res.json("No ticket record in the database!");
        }
    } catch (error) {
        res.status(500).send("Server Error" + error);
    }
};

//get all ticket records
const getTicket = async (req, res) => {
    try {
        const ticket = await Ticket.find();
        res.json(ticket)
    } catch (error) {
        res.status(500).send("Server Error : " + error);
    }
}

//Update Exsisting Ticket record
const updateTicket = async (req, res) => {
    Ticket.findByIdAndUpdate(req.params.id).
        then((exsistingTicket) => {
            exsistingTicket.firstName = req.body.firstName;
            exsistingTicket.lastName = req.body.lastName;
            exsistingTicket.passportID = req.body.passportID;
            exsistingTicket.phoneNumber = req.body.phoneNumber;
            exsistingTicket.bookingDate = Date.parse(req.body.bookingDate);
            exsistingTicket.toLocation = req.body.toLocation;
            exsistingTicket.price = req.body.price;
            exsistingTicket.save()
                .then((updatedTicker) => res.json(updatedTicker))
                .catch((error) => res.status(400).json("Error: " + error));
        })
        .catch((error) => res.status(400).json("Error: 1" + error));
};

//export 
module.exports = {
    createTicket,
    deleteTicket,
    getTicketById,
    getTicket,
    updateTicket
};

