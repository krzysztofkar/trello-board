const Joi = require("joi");
const express = require("express");
const mongoose = require("mongoose");
const login = require("./routes/login");
const logout = require("./routes/logout");
const register = require("./routes/register");
const tasks = require("./routes/tasks");
const bodyParser = require("body-parser");
const path = require("path");
const config = require("config");
const app = express();

var cookieParser = require("cookie-parser");

if (!config.get("jwtPrivateKey")) {
  console.log("jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/tasksDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connected to MongoDb..."))
  .catch(err => console.log("Connection to DB failed...", err));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use("/api/login", login);
app.use("/api/register", register);
app.use("/api/tasks", tasks);
app.use("/api/logout", logout);

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.get("/", function(req, res) {
  res.render("layout.pug");
});
