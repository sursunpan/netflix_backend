const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  thumbnailUrl: String,
  genre: String,
  duration: String,
});

MovieSchema.set("timestamps", true);
MovieSchema.set("toJSON", { virtual: true });
MovieSchema.set("toObject", { virtual: true });

module.exports = mongoose.model("Movie", MovieSchema);
