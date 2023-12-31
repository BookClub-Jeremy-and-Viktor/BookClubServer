const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: String,
  genre: String,
  availability: String,
  comments: [String],
  imageUrl: String,

  event: [{ type: Schema.Types.ObjectId, ref: "Event" }],
});

module.exports = model("Book", bookSchema);
