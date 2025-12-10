const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const exercisesRouter = require("./Routes/exercises");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/WorkoutApi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api", require("./Routes/router"));

app.use("/", exercisesRouter);

// Auth Routes
const authRoutes = require("./Routes/router");
app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
