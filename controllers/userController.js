// @desc get all description
// @route GET /api/getcontacts
// @access public

const AsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = AsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("not valid data");
  } else {
    const userAvaliable = await User.findOne({ email });
    if (userAvaliable) {
      res.status(400);
      throw new Error("user is already exist");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      res.status(201).json(user);
    }
  }
});

const loginUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("not valid data");
  } else {
    const userAvaliable = await User.findOne({ email });
    if (!userAvaliable) {
      res.status(400);
      throw new Error("user not exists");
    }
    const isCorrectPassword = await bcrypt.compare(
      password,
      userAvaliable.password
    );
    if (!isCorrectPassword) {
      res.status(400);
      throw new Error("not correct password");
    } else {
      const accessToken = jwt.sign(
        {
          user: {
            username: userAvaliable.username,
            email: userAvaliable.email,
            id: userAvaliable._id.toHexString(),
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );
      res.status(201).json({ accessToken });
    }
  }
});

const getCurrentUser = AsyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};
