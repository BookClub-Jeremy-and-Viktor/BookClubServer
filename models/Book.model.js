const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookSchema = new Schema({
  title: String,
  author: String,
  genre: String,
  availability: Boolean,
  event: { type: Schema.Types.ObjectId, ref: "Event" },
});

module.exports = model("Book", bookSchema);
