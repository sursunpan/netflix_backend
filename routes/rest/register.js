const User = require("../../models/user");
const bcrypt = require("bcrypt");
module.exports = {
  async post(req, res) {
    try {
      const { email, password, name } = req.body;

      if (email === undefined || email === "") {
        return res.status(400).json({
          error: true,
          reason: "Email is Required!!",
        });
      }

      if (password === undefined || password === "") {
        return res.status(400).json({
          error: true,
          reason: "password is Required!!",
        });
      }

      if (name === undefined || name === "") {
        return res.status(400).json({
          error: true,
          reason: "name is Required!!",
        });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          error: true,
          reason: "You are exist already!!",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await User.create({
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      });

      return res.status(200).json({
        error: false,
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: true,
        reason: err.message,
      });
    }
  },
};
