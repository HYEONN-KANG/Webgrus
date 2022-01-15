const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema({
  id: String,
  poster: { data: Buffer, contentType: String },
  title: String,
  description: String,
  author: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("contests", contestSchema);
