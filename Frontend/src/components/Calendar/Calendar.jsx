import React, { useState, useEffect } from "react";

import "./Calendar.css";

function GoalModal({ onClose, onSave }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [goal, setGoal] = useState("");

  const handleChooseDay = () => {
    setShowCalendar((prev) => !prev);
  };
  const [selectedDay, setSelectedDay] = useState("");
  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  const handleSave = () => {
    if (goal.trim()) {
      onSave(goal, selectedDay);
      setGoal("");
      onClose();
    }
  };
}

const Calendar = () => {
  const [calendarWorkouts, setCalendarWorkouts] = useState({});
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [workoutSet, setWorkoutSet] = useState(0);
  const [workoutRep, setWorkoutRep] = useState(0);
  const userId = localStorage.getItem("userId");
  const [workoutModal, setWorkoutModal] = useState(false);

  function openModal(workout) {
    setSelectedWorkout(workout);
    setWorkoutSet(workout.sets || 0);
    setWorkoutRep(workout.reps || 0);
    setWorkoutModal(true);
  }

  function closeModal() {
    setWorkoutModal(false);
    setSelectedWorkout(null);
  }

  function handleDeleteWorkout() {
    fetch(
      `http://localhost:5000/api/user-workouts/${userId}/${selectedWorkout._id}`,
      {
        method: "DELETE",
        contents: "application/json",
      }
    )
      .then((res) => res.json())
      .then(() => {
        fetch(`http://localhost:5000/api/user-workouts/${userId}`)
          .then((res) => res.json())
          .then((data) => {
            const grouped = {};
            data.workouts.forEach((w) => {
              if (!grouped[w.day]) grouped[w.day] = [];
              grouped[w.day].push(w);
            });
            setCalendarWorkouts(grouped);
          });
        closeModal();
      });
  }

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:5000/api/user-workouts/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const grouped = {};
        data.workouts.forEach((w) => {
          if (!grouped[w.day]) grouped[w.day] = [];
          grouped[w.day].push(w);
        });
        setCalendarWorkouts(grouped);
      });
  }, [userId]);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Weekly Workouts</h2>
      <ul className="calendar-week">
        {daysOfWeek.map((day) => (
          <li className="calendar-day" key={day}>
            <strong className="workout-day">{day}</strong>
            <ul className="workout-list">
              {(calendarWorkouts[day] || []).map((workout) => (
                <li
                  onClick={() => openModal(workout)}
                  className="workout-item"
                  key={workout._id}
                >
                  <div className="workout-item-header">
                    <span className="workout-item-name">{workout.name}</span>
                    <span className="workout-item-setsreps">
                      <span className="sets-badge">
                        Sets: {workout.sets ?? 0}
                      </span>
                      <span className="reps-badge">
                        Reps: {workout.reps ?? 0}
                      </span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {workoutModal && selectedWorkout && (
        <div className="workout-modal">
          <div className="modal-content">
            <h1 className="modal-title">{selectedWorkout.name}</h1>
            <button className="modal-close" onClick={closeModal}>
              X
            </button>
            {selectedWorkout.image && (
              <img src={selectedWorkout.image} alt={selectedWorkout.name} />
            )}
            <label>
              <input
                value={workoutSet}
                onChange={(e) => setWorkoutSet(Number(e.target.value))}
                className="workout-set"
                type="number"
                placeholder="Sets"
              />
              <input
                value={workoutRep}
                onChange={(e) => setWorkoutRep(Number(e.target.value))}
                className="workout-rep"
                type="number"
                placeholder="Reps"
              />
            </label>
            <button
              onClick={handleDeleteWorkout}
              className="workout-delete-btn"
            >
              Delete
            </button>
            <button
              className="workout-save-btn"
              onClick={async () => {
                await fetch(
                  `http://localhost:5000/api/user-workouts/${userId}/${selectedWorkout._id}`,
                  {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      sets: workoutSet,
                      reps: workoutRep,
                    }),
                  }
                );
                fetch(`http://localhost:5000/api/user-workouts/${userId}`)
                  .then((res) => res.json())
                  .then((data) => {
                    const grouped = {};
                    data.workouts.forEach((w) => {
                      if (!grouped[w.day]) grouped[w.day] = [];
                      grouped[w.day].push(w);
                    });
                    setCalendarWorkouts(grouped);
                  });
                closeModal();
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
