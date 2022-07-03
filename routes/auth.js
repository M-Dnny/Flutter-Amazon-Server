const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const authRouter = express.Router();

// Sign UP

authRouter.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res
        .status(400)
        .json({ msg: "User with same email already exists" });
    }

    const hasedPassword = await bcrypt.hash(password, 8);

    let user = new User({
      name,
      email,
      password: hasedPassword,
    });

    user = await user.save();
    res.json({ data: user });
  } catch (error) { 
    res.status(500).json({ error: error.message });
  }
});

module.exports = authRouter;
