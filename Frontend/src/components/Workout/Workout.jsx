import React, { useState, useEffect } from "react";
import "./Workout.css";

const Workout = ({ setCalendarWorkouts }) => {
  const role = localStorage.getItem("role");
  const [workouts, setWorkouts] = useState([]);
  const [workoutModal, setWorkoutModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [addWorkoutModal, setAddWorkoutModal] = useState(false);

  const [newWorkoutName, setNewWorkoutName] = useState("");
  const [newWorkoutCategory, setNewWorkoutCategory] = useState("");
  const [newWorkoutImage, setNewWorkoutImage] = useState("");
  const [newWorkoutDescription, setNewWorkoutDescription] = useState("");

  // retrieve workouts from API
  useEffect(() => {
    fetch("http://localhost:5000/exercises")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
      })
      .catch((err) => console.error("API error:", err));
  }, []);

  // get workouts from category
  const handlePartClick = (categoryName) => {
    setLoading(true);
    const filtered = workouts.filter((ex) => ex.category === categoryName);
    setExercises(filtered);
    setLoading(false);
  };

  //function to choose day and exercise and send to calendar
  const handleAddToCalendar = async () => {
    if (!selectedDay) return;
    setCalendarWorkouts((prev) => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay] || []), selectedExercise],
    }));

    const userId = localStorage.getItem("userId");
    console.log("Adding workout:", {
      userId,
      selectedDay,
      selectedExercise,
    });
    if (!userId) {
      console.warn(
        "No userId found in localStorage. Workout will not be saved to backend."
      );
    } else {
      fetch("http://localhost:5000/api/add-workout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          workout: { ...selectedExercise, day: selectedDay },
        }),
      });
    }
    setWorkoutModal(false);
  };

  // add new Workouts
  const handleAddWorkout = async () => {
    const newWorkout = {
      name: newWorkoutName,
      image: newWorkoutImage,
      category: newWorkoutCategory,
      description: newWorkoutDescription,
    };
    try {
      const res = await fetch("http://localhost:5000/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWorkout),
      });
      if (res.ok) {
        setAddWorkoutModal(false);
        setNewWorkoutName("");
        setNewWorkoutImage("");
        setNewWorkoutCategory("");
        setNewWorkoutDescription("");
        fetch("http://localhost:5000/exercises")
          .then((res) => res.json())
          .then((data) => setWorkouts(data));
      } else {
        alert("Failed to add workout.");
      }
    } catch (err) {
      alert("Error adding workout.");
    }
  };

  const handleDeleteWorkout = async () => {
    if (!selectedExercise || !selectedExercise._id) return;
    try {
      const res = await fetch(
        `http://localhost:5000/exercises/${selectedExercise._id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.ok) {
        setWorkoutModal(false);
        setWorkouts((prev) =>
          prev.filter((ex) => ex._id !== selectedExercise._id)
        );
        setExercises((prev) =>
          prev.filter((ex) => ex._id !== selectedExercise._id)
        );
      } else {
        console.log("Deleting exercise with ID:", selectedExercise._id);

        alert("Failed to delelte workout.");
      }
    } catch (err) {
      alert("Error deleting workout.");
    }
  };

  const Categories = [...new Set(workouts.map((ex) => ex.category))];

  return (
    <div>
      <h1 className="workout-title">Workouts</h1>
      <div className="add-workout-container">
        {role === "admin" && (
          <button
            className="add-workout-btn"
            onClick={() => setAddWorkoutModal(true)}
          >
            Add Workout
          </button>
        )}

        {/* admin workout modal */}
        {addWorkoutModal && (
          <div className="workout-modal">
            <div className="modal-content add-modal-content">
              <button
                className="modal-close"
                onClick={() => setAddWorkoutModal(false)}
                style={{ float: "right" }}
              >
                ×
              </button>
              <h1 className="add-workout-title">Add New Workout</h1>
              <div className="add-workout-fields">
                <label>
                  Name
                  <input
                    className="add-workout-input"
                    type="text"
                    placeholder="Workout name"
                    onChange={(e) => setNewWorkoutName(e.target.value)}
                  />
                </label>
                <label>
                  Image URL
                  <input
                    className="add-workout-input"
                    type="url"
                    placeholder="Image URL"
                    onChange={(e) => setNewWorkoutImage(e.target.value)}
                  />
                </label>
                <label>
                  Category
                  <input
                    className="add-workout-input"
                    type="text"
                    placeholder="Category"
                    onChange={(e) => setNewWorkoutCategory(e.target.value)}
                  />
                </label>
                <label>
                  Description
                  <textarea
                    className="add-workout-input"
                    placeholder="Description"
                    onChange={(e) => setNewWorkoutDescription(e.target.value)}
                    rows={3}
                  />
                </label>
              </div>
              <button
                onClick={handleAddWorkout}
                className="add-workout-btn"
                style={{ marginTop: "1rem" }}
              >
                Save Workout
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="workout-parts-list">
        <ul>
          {Categories.map((category, index) => (
            <li className="workout-part" key={index}>
              <button onClick={() => handlePartClick(category)}>
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="workout-card-container">
        {Loading && <p className="workout-loading">Loading Workouts...</p>}
        {Array.isArray(exercises) &&
          exercises.map((exercise) => (
            <div
              onClick={() => {
                setSelectedExercise(exercise);
                setWorkoutModal(true);
              }}
              className="workout-card"
              key={exercise._id}
            >
              <img
                src={exercise.image}
                alt={exercise.name}
                className="card-image"
              />
              <h2 className="card-title">{exercise.name}</h2>
              <p className="workout-card-description">{exercise.description}</p>
            </div>
          ))}

        {/* workout card modal  */}
        {workoutModal && selectedExercise && (
          <div className="workout-modal">
            <div className="modal-content">
              <h2 className="modal-title">{selectedExercise.name}</h2>
              <img
                src={selectedExercise.image}
                alt={selectedExercise.name}
                className="card-image"
              />
              <label>
                Add to Day:
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  style={{ marginLeft: "10px" }}
                >
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                </select>
              </label>
              <div className="workout-btn-container">
                {role === "admin" && (
                  <button
                    onClick={handleDeleteWorkout}
                    className="delete-workout-btn"
                  >
                    Delete
                  </button>
                )}
                <button
                  onClick={handleAddToCalendar}
                  className="add-workout-btn"
                >
                  Add Workout
                </button>
                <button
                  className="modal-close"
                  onClick={() => setWorkoutModal(false)}
                >
                  X
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workout;
