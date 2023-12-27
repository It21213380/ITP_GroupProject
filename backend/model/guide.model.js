const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GuideSchema = new Schema({
    guideName: { type: String, required: true },
    email: { type: String, required: true },
    langType: { type: String, required: true },
    serviceType: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    address: { type: String, required: true },
    nic: { type: String, required: true },
}, {
    timestamps: true,
})

module.exports = Guide = mongoose.model("guides", GuideSchema);