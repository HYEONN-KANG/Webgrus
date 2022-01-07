const mongoose = require("mongoose");
const notionSchema = new mongoose.Schema({
  title: String,
  desc: String,
  data: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("notions", notionSchema);
