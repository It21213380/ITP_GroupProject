const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmpPayDetailSchema = new Schema({
  employeeId: { type: String, required: true },
  accHolderName: { type: String, required: true },
  accNumber: { type: String, required: true },
  bankName: { type: String, required: true },
  bankBranchName: { type: String, required: true },
  approved: { type: Boolean, required: true, default: false }
}, {
  timestamps: true
});

module.exports = EmpPayDetail = mongoose.model("EmpPayDetail", EmpPayDetailSchema);
