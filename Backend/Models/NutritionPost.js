const mongoose = require("mongoose");

const nutritionPostSchema = new mongoose.Schema({
  user: { type: String, required: true },
  recipe: String,
  description: String,
  likes: Number,
  comments: [],
});

module.exports = mongoose.model("NutritionPost", nutritionPostSchema);
