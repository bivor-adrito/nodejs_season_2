const express = require("express");
const router = express.Router();
const Task = require("../../models/Task");

//* create a task
router.post("/", async (req, res) => {
  const taskObj = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
  };
  const task = new Task(taskObj);
  await task.save();
  res.status(201).json(task);
});

//* get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

//* get one task
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: "Task Not Found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

//* Update One Task
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const taskBody = req.body;
    const newTask = await Task.findByIdAndUpdate(id, taskBody, { new: true });
    if (newTask) {
      res.json(newTask);
    } else {
      res.status(404).json({ message: "Task not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

//* Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (deletedTask) {
      res.json({ message: "The task is deleted" });
    } else {
      res.status(404).json({ message: "Task not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

module.exports = router;
