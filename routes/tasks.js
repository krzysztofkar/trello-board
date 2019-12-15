const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const moment = require("moment");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const toDoTasks = await Task.find({
    status: "ToDo"
  });
  const inProgressTasks = await Task.find({
    status: "InProgress"
  });
  const doneTasks = await Task.find({
    status: "Done"
  });
  res.render("tasks.pug", {
    toDoTasks: toDoTasks,
    inProgressTasks: inProgressTasks,
    doneTasks: doneTasks,
    moment: moment,
    error: req.errorMsg
  });
});

router.get("/add", auth, async (req, res) => {
  res.render("add-task.pug", {
    error: req.errorMsg
  });
});

router.post("/", auth, async (req, res) => {
  const task = new Task({
    title: req.body.taskTitle,
    description: req.body.taskDescription,
    deadlineAt: req.body.taskDeadline
  });
  await task.save();
  res.redirect("/api/tasks");
});

router.put("/:id", auth, async (req, res) => {
  let task = await Task.findById(req.params.id);
  task.status = req.body.status;
  task.save();
});

router.get("/delete/:id", auth, async (req, res) => {
  const task = await Task.findByIdAndRemove(req.params.id);
  res.redirect("/api/tasks");
});

module.exports = router;