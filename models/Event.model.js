const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const eventSchema = new Schema({
  title: String,
  location: String,
  address: String,
  description: String,
  time: String,
  date: String,
  comments: [String],

  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  // owner will be added later on
});

module.exports = model("Event", eventSchema);
