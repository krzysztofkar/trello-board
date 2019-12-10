const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  res.render("login.pug");
});

router.post("/", function(req, res) {
  res.redirect("/api/tasks");
});

module.exports = router;
