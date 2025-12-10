const express = require("express");
const router = express.Router();
const Exercise = require("../Models/Exercise");

// Get all exercises
router.get("/exercises", async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch exercises." });
  }
});

// Add new exercise(s)
router.post("/exercises", async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const exercises = await Exercise.insertMany(req.body);
      return res.status(201).json(exercises);
    } else {
      const { name, category, description, image } = req.body;
      const exercise = new Exercise({ name, category, description, image });
      await exercise.save();
      res.status(201).json(exercise);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to add exercise." });
  }
});

// Bulk update exercises by id
router.put("/exercises/bulk-update-by-id", async (req, res) => {
  if (!Array.isArray(req.body))
    return res.status(400).send("Request body must be an array");
  const results = [];
  for (const update of req.body) {
    if (!update._id) continue;
    const exercise = await Exercise.findByIdAndUpdate(update._id, update, {
      new: true,
    });
    if (exercise) results.push(exercise);
  }
  res.json(results);
});

// Update a single exercise by id
router.put("/exercises/:id", async (req, res) => {
  const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!exercise) return res.status(404).send("Exercise not found");
  res.json(exercise);
});

// Delete an exercise by id
router.delete("/exercises/:id", async (req, res) => {
  try {
    const deleted = await Exercise.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Exercise not found." });
    }
    res.json({ message: "Exercise deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete exercise." });
  }
});

module.exports = router;
