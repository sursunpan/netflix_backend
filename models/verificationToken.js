const mongoose = require("mongoose");

const VerificationTokenSchema = new mongoose.Schema({
  identifier: String,
  token: {
    type: String,
    unique: true,
  },
  expires: Date,
});

VerificationTokenSchema.set("timestamps", true);
VerificationTokenSchema.set("toJSON", { virtual: true });
VerificationTokenSchema.set("toObject", { virtual: true });

module.exports = mongoose.model("VerificationToken", VerificationTokenSchema);
