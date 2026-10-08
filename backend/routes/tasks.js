// A4 / A5 - REST API routes for tasks (mounted at /api/tasks)
const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");

const router = express.Router();

// A5 - convert to String, trim, return "" if missing
const cleanTitle = (value) => String(value ?? "").trim();

// Returns true when the :id in the URL is not a valid MongoDB ObjectId
const badId = (id) => !mongoose.isValidObjectId(id);

// GET /api/tasks - fetch all tasks (oldest first)
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: 1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch tasks" });
  }
});

// POST /api/tasks - add a new task
router.post("/", async (req, res) => {
  const title = cleanTitle(req.body.title);
  if (!title) {
    return res.status(400).json({ error: "Title cannot be empty" });
  }
  try {
    const task = await Task.create({ title });
    res.status(201).json(task); // 201 Created
  } catch (err) {
    res.status(500).json({ error: "Could not create task" });
  }
});

// PUT /api/tasks/:id - edit title and/or mark complete/incomplete
router.put("/:id", async (req, res) => {
  if (badId(req.params.id)) {
    return res.status(404).json({ error: "Task not found" });
  }

  const update = {};

  // Only validate the title if the client sent one
  if (req.body.title !== undefined) {
    const title = cleanTitle(req.body.title);
    if (!title) {
      return res.status(400).json({ error: "Title cannot be empty" });
    }
    update.title = title;
  }

  if (req.body.completed !== undefined) {
    if (typeof req.body.completed !== "boolean") {
      return res.status(400).json({ error: "completed must be true or false" });
    }
    update.completed = req.body.completed;
  }

  try {
    // new: true returns the updated document
    const task = await Task.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: "Could not update task" });
  }
});

// DELETE /api/tasks/:id - delete a task
router.delete("/:id", async (req, res) => {
  if (badId(req.params.id)) {
    return res.status(404).json({ error: "Task not found" });
  }
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json({ message: "Task deleted", id: task._id });
  } catch (err) {
    res.status(500).json({ error: "Could not delete task" });
  }
});

module.exports = router;
