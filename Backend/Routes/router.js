const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const NutritionPost = require("../Models/NutritionPost");

console.log("Router file loaded");

// Register Route
router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: "Email already in use" });
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashed, name });
  await user.save();
  res.status(201).json({
    message: "User created",
    userId: user._id,
    name: user.name,
    role: user.role,
  });
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Invalid credentials" });
  const token = jwt.sign({ userId: user._id }, "SECRET_KEY");
  res.json({ token, userId: user._id, name: user.name, role: user.role });
});

// Add Workout Route
router.post("/add-workout", async (req, res) => {
  const { userId, workout } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  // Always assign a new unique _id when adding
  const mongoose = require("mongoose");
  workout._id = new mongoose.Types.ObjectId();
  user.workouts.push(workout);
  await user.save();

  res.json({
    message: "Workout added",
    workouts: user.workouts,
    role: user.role,
  });
});

// Get User Workouts Route
router.get("/user-workouts/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ workouts: user.workouts });
});

router.put("/user-workouts/:userId/:workoutId", async (req, res) => {
  const { userId, workoutId } = req.params;
  const { sets, reps } = req.body;
  try {
    const user = await User.findById(userId);
    const workout = user.workouts.id(workoutId);
    if (workout) {
      workout.sets = sets;
      workout.reps = reps;
      await user.save();
      res.json({ success: true, workout });
    } else {
      res.status(404).json({ error: "Workout not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get all users route for admin
router.get("/all/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// change role for users
router.put("/user/:id/role", async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Always assign a new unique _id when adding workout to calendar

router.post("/add-workout", async (req, res) => {
  const { userId, workout } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const mongoose = require("mongoose");
  workout._id = new mongoose.Types.ObjectId();
  user.workouts.push(workout);
  await user.save();

  res.json({
    message: "Workout added",
    workouts: user.workouts,
    role: user.role,
  });
});

// Delete a workout from calendar
router.delete("/user-workouts/:userId/:workoutId", async (req, res) => {
  console.log("Route loaded");
  const { userId, workoutId } = req.params;
  console.log("DELETE request received:", { userId, workoutId });
  try {
    const user = await User.findById(userId);
    console.log("User found:", user);
    if (!user) {
      console.log("User not found:", userId);
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const workout = user.workouts.id(workoutId);
    console.log("Workout found:", workout);
    if (!workout) {
      console.log("Workout not found:", workoutId);
      return res
        .status(404)
        .json({ success: false, message: "Workout not found" });
    }

    try {
      user.workouts.pull(workoutId);
      await user.save();
      console.log("Workout deleted:", workoutId);
      res.json({ success: true, message: "Workout deleted" });
    } catch (saveErr) {
      console.error("Error saving user after workout removal:", saveErr);
      res.status(500).json({
        success: false,
        message: "Error saving user after workout removal",
        error: saveErr.message,
      });
    }
  } catch (err) {
    console.error("Error deleting workout:", err);
    res.status(500).json({
      success: false,
      message: "Error deleting workout",
      error: err.message,
    });
  }
});

// Delete user by ID (admin only)
router.delete("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get all posts in backend
router.get("/nutrition-posts", async (req, res) => {
  try {
    const posts = await NutritionPost.find();
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// add nutrition post
router.post("/nutrition-post", async (req, res) => {
  const { userId, recipe, description } = req.body;
  try {
    const post = new NutritionPost({
      user: userId,
      recipe,
      description,
      likes: 0,
      comments: [],
    });
    await post.save();
    res.status(201).json({ success: true, post });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// delete nutrition posts
router.delete("/nutrition-post/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const post = await NutritionPost.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json({ success: true, message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
