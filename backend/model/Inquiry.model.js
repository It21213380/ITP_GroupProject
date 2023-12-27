const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InquirySchema = new Schema({
    CusName: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    contactNum: { type: String, required: true },
    address: { type: String, required: true }, 
    date: { type: Date, required: true },
    status: { type: String, required: true },
}, {
    timestamps: true,
})

module.exports = Inquiry = mongoose.model("Inquiry", InquirySchema);