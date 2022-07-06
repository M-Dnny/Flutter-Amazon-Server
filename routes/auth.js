const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

const authRouter = express.Router();

// Sign UP

authRouter.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });

    if (existUser) {
      // return res
      //   .status(400)
      //   .json({ msg: "User with same email already exists" });
      return res.send({
        success:'false',
        message: "User with same email already exists",
      });
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

// Sign IN

authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist!" });
    }

    // compare password

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrent password!!" });
    }

    const token = jwt.sign({ id: user._id }, "passwordKey");

    res.json({ data: { token, ...user._doc } });
  } catch (error) {
    res.status().json({ error: error.message });
  }
});

// Get User Data

authRouter.get("/api/getInfo", auth, async (req, res) => {
  const user = await User.findById(req.user);

  res.json({ data: { token: req.token, ...user._doc } });
});

module.exports = authRouter;
