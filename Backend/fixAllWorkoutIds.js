const mongoose = require("mongoose");
const User = require("./Models/User");

async function fixAllWorkoutIds() {
  await mongoose.connect("mongodb://localhost:27017/WorkoutApi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Always assign a new unique _id for any workout added to calendar.

  const users = await User.find();
  for (const user of users) {
    let changed = false;
    user.workouts.forEach((w, idx) => {
      w._id = new mongoose.Types.ObjectId();
      changed = true;
    });
    if (changed) {
      await user.save();
      console.log(`Fixed workout IDs for user: ${user._id}`);
    }
  }
  await mongoose.disconnect();
  console.log("All workout IDs fixed!");
}

fixAllWorkoutIds();
