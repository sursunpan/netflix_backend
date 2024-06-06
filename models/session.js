const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  sessionToken: {
    type: String,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  expires: Date,
});

SessionSchema.set("timestamps", true);
SessionSchema.set("toJSON", { virtual: true });
SessionSchema.set("toObject", { virtual: true });

module.exports = mongoose.model("Session", SessionSchema);
