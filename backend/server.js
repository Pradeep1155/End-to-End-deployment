const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/todoapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Schema and Model
const taskSchema = new mongoose.Schema({ text: String });
const Task = mongoose.model("Task", taskSchema);

// Routes
app.post("/tasks", async (req, res) => {
  const { text } = req.body;
  const task = new Task({ text });
  await task.save();
  res.json(task);
});

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
