const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

router.get("/", function(req, res) {
  res.render("login.pug");
});

router.post("/", async (req, res) => {
  let user = await User.findOne({
    email: req.body.email
  });

  if (!user)
    res.render("login.pug", { error: "Invalid email or password. Try again" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    res.render("login.pug", { error: "Invalid email or password. Try again" });
  }
  const token = jwt.sign(
    {
      _id: user._id
    },
    config.get("jwtPrivateKey")
  );
  res.cookie("auth", token);
  res.redirect("/api/tasks");
});

module.exports = router;
