const mongoose = require("mongoose");

const IotDataSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("IotData", IotDataSchema);
