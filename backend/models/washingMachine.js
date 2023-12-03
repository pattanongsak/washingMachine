const mongoose = require("mongoose");

const washingMachineSchema = new mongoose.Schema({
  washingMachineNumber: {
    type: Number,
  },
  washingMachineName: {
    type: String,
  },
  washingMachineModel: {
    type: String,
  },
  washingMachineImage: {
    type: String,
  },
  washingMachineStatus: {
    type: String,
    default: "พร้อมใช้งาน",
  },
  washingMachineCoin: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("WashingMachine", washingMachineSchema);
