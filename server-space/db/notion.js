const mongoose = require("mongoose");
const notionSchema = new mongoose.Schema({
  title: String,
  desc: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

let notion_model = mongoose.model("notions", notionSchema);
module.export = notion_model;
