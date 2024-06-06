const mongoose = require("mongoose");
const User = require("../../models/user");

module.exports = {
  async get(req, res) {
    try {
      const user = await User.findOne({
        _id: req.auth.id,
      }).exec();

      if (user === null) {
        return res.status(400).json({
          error: true,
          reason: "No such user is found!!",
        });
      }

      return res.status(200).json({
        error: false,
        user,
      });
    } catch (err) {
      return res.status(500).json({
        error: true,
        reason: err.message,
      });
    }
  },
};
