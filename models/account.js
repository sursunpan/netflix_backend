const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  type: String,
  provider: String,
  providerAccountId: String,
  refresh_token: String,
  access_token: String,
  expires_at: Number,
  token_tye: String,
  scope: String,
  id_token: String,
  session_token: String,
});

AccountSchema.set("timestamps", true);
AccountSchema.set("toJSON", { virtual: true });
AccountSchema.set("toObject", { virtual: true });

module.exports = mongoose.model("Account", AccountSchema);
