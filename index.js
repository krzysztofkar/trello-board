const express = require("express");
const mongoose = require("mongoose");
const tasks = require("./routes/tasks");
const bodyParser = require("body-parser");
const path = require("path");
const config = require("config");
const app = express();

var cookieParser = require("cookie-parser");

mongoose
  .connect(config.get("db"), {
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
app.use("/api/tasks", tasks);
require("./startup/prod")(app);
const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.get("/api/tasks", function (req, res) {
  res.render("layout.pug");
});