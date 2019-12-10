var mongoose = require("mongoose");

var taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadlineAt: Date,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  status: {
    type: String,
    enum: ['ToDo', 'InProgress', 'Done'],
    default: "ToDo"
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;