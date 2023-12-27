const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GuidePackSchema = new Schema({
    guideName: { type: String, required: true },
    touristArea: { type: String, required: true },
    langType: { type: String, required: true },
    vehicleType: { type: String, required: true },
    price: { type: String, required: true },
}, {
    timestamps: true,
})

module.exports = GuidePack = mongoose.model("guidePackages", GuidePackSchema);