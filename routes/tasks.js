const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const moment = require("moment");

router.get("/", async (req, res) => {
  const toDoTasks = await Task.find({
    status: "ToDo"
  }).sort({
    position: 'ascending'
  });
  const inProgressTasks = await Task.find({
    status: "InProgress"
  }).sort('position');
  const doneTasks = await Task.find({
    status: "Done"
  }).sort('position');

  res.render("tasks.pug", {
    toDoTasks: toDoTasks,
    inProgressTasks: inProgressTasks,
    doneTasks: doneTasks,
    moment: moment,
    error: req.errorMsg
  });
});

router.get("/add", async (req, res) => {
  res.render("add-task.pug", {
    error: req.errorMsg
  });
});

router.post("/add", async (req, res) => {
  const task = new Task({
    title: req.body.taskTitle,
    description: req.body.taskDescription,
    deadlineAt: req.body.taskDeadline
  });
  try {
    await task.save();
    res.redirect("/api/tasks")
  } catch (err) {
    res.render("add-task.pug", {
      errors: err.errors
    });
  }
});

router.put("/:id", async (req, res) => {
  let task = await Task.findById(req.params.id);
  task.status = req.body.status;
  for (let taskID of req.body.tasksIDs) {
    let taskToChange = await Task.findById(taskID);
    taskToChange.position = Array.from(req.body.tasksIDs).indexOf(taskID);
    taskToChange.save();
  }
  task.save();
});

router.get("/delete/:id", async (req, res) => {
  const task = await Task.findByIdAndRemove(req.params.id);
  res.redirect("/api/tasks");
});

module.exports = router;