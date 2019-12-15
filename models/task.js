var mongoose = require("mongoose");

var taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  deadlineAt: {
    type: Date,
    required: true
  },
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