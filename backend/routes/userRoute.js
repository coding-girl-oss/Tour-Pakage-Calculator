const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Route for signup
router.post("/signin", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(401).send("Missing required fields!");
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).send("Email already taken");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({ username, email, password: hash });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.cookie("active-cookie", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      .status(200)
      .json({
        message: "User registered successfully",
      });
  } catch (error) {
    res.status(500).send("Internal server Error!");
  }
});

// Route for signin

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).send("Missing required fields!");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    const correctPass = await bcrypt.compare(password, user.password);
    if (!correctPass) {
      return res.status(401).send("Invalid credentials");
    }

    const userData = await User.findOne({ email }).select("-password");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("active-cookie", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      .status(200)
      .json({
        message: "User registered successfully",
        userData,
        token
      });
    console.log("Cookie set:", res.getHeader("Set-Cookie"));
  } catch (error) {
    res.status(500).send("Internal server Error!");
  }
});



// route to signout user

router.get("/signout", (req, res) => {
  try {
    res.clearCookie("active-cookie");
    res.status(200).send("logged out successfully!");
  } catch (error) {
    res.status(500).send("Internal server Error!");
  }
});

module.exports = router