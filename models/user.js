const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
  },
  image: {
    type: String,
  },
  emailVerified: Date,
  hashedPassword: String,
  favoriteIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
});

UserSchema.set("timestamps", true);
UserSchema.set("toJSON", { virtuals: true });
UserSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("User", UserSchema);
