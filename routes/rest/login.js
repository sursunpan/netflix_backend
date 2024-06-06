const User = require("../../models/user");
const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async post(req, res) {
    try {
      const { email, password } = req.body;

      if (email === undefined || email === "") {
        return res.status(400).json({
          error: true,
          reason: "Email is Required!!",
        });
      }

      if (password === undefined || password === "") {
        return res.status(400).json({
          error: true,
          reason: "Password is Required!!",
        });
      }

      const user = await User.findOne({
        email,
      });

      if (user === null) {
        return res.status(400).json({
          error: true,
          reason: "No Such User is found!!",
        });
      }

      const isCorrectPassword = await compare(password, user.hashedPassword);

      if (!isCorrectPassword) {
        return res.status(400).json({
          error: true,
          reason: "Incorrect Password!!",
        });
      }

      const payload = {
        id: user._id,
        _id: user._id,
        fullName: user.name,
        email: user.email,
        phone: user.phone,
      };

      const token = jwt.sign(payload, "surajsuperstart", {
        expiresIn: 3600 * 24 * 30, // 1 month
      });

      return res.status(200).json({
        error: false,
        user,
        token,
      });
    } catch (err) {
      return res.status(500).json({
        error: true,
        reason: err.message,
      });
    }
  },
};
