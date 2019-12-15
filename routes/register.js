const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const config = require('config');

router.get("/", function (req, res) {
  res.render("register.pug");
});

router.post("/", async (req, res) => {
  let user = await User.findOne({
    email: req.body.email
  });

  if (user) return res.status(400).send("User already exists.");

  user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = jwt.sign({
    _id: this._id
  }, config.get('jwtPrivateKey'));

  res.cookie('auth', token);

  res.redirect("/api/tasks");
});

module.exports = router;