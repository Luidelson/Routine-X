const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  name: String,
  day: String,
  sets: Number,
  reps: Number,
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  workouts: { type: [workoutSchema], default: [] },
});

module.exports = mongoose.model("User", userSchema);
