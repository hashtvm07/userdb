const mongoose = require("mongoose");

const ScreenSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  en_name: { type: String, required: true },
  ar_name: { type: String, required: true },
});

module.exports = mongoose.model("Screen", ScreenSchema);
