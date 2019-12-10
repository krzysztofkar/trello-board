const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  res.render("register.pug");
});

router.post("/", function(req, res) {
  res.redirect("/api/login");
});

module.exports = router;
