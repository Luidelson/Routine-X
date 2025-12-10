import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = ({ setIsLoggedIn, editName, setEditName }) => {
  const role = localStorage.getItem("role");
  const [showModal, setShowModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [weightGoal, setWeightGoal] = useState(0);
  const [fitnessGoals, setFitnessGoals] = useState("");
  const [weightHistory, setWeightHistory] = useState([
    { date: "2025-12-01", weight: 80 },
    { date: "2025-12-15", weight: 78 },
    { date: "2025-12-28", weight: 77 },
  ]);
  const [bodyFat, setBodyFat] = useState(18);
  const [muscleMass, setMuscleMass] = useState(40);
  const [workoutStreak, setWorkoutStreak] = useState(5);
  const [personalBests, setPersonalBests] = useState({
    bench: 100,
    squat: 140,
    deadlift: 160,
  });

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setEditName("");
    localStorage.clear();
    navigate("/");
    setIsLoggedIn(false);
  };

  function handleNameChange(e) {
    setEditName(e.target.value);
  }

  function handleSaveName() {
    localStorage.setItem("username", editName);
    closeModal();
  }

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function openSettings() {
    setShowSettings(true);
  }

  function closeSettings() {
    setShowSettings(false);
  }

  function handleWeightChange(e) {
    setCurrentWeight(e.target.value);
  }

  function handleWeightGoalChange(e) {
    setWeightGoal(e.target.value);
  }

  function handleFitnessGoalsChange(e) {
    setFitnessGoals(e.target.value);
  }

  function handleBodyFatChange(e) {
    setBodyFat(e.target.value);
  }

  function handleMuscleMassChange(e) {
    setMuscleMass(e.target.value);
  }

  function handlePersonalBestChange(lift, value) {
    setPersonalBests((prev) => ({ ...prev, [lift]: value }));
  }

  function handleToggleDarkMode() {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle("dark-mode");
  }

  function handleToggleNotifications() {
    setNotifications((prev) => !prev);
  }

  return (
    <div className={`profile-Section${darkMode ? " dark" : ""}`}>
      <div className="profile-container">
        <p className="profile-name">{editName || "New User"}</p>
        {role === "trainer" && <p className="profile-role">(Trainer)</p>}
        {role === "admin" && <p className="profile-role">(Admin)</p>}
        <button onClick={openModal} className="profile-edit">
          Edit Profile
        </button>
        <button className="profile-settings" onClick={openSettings}>
          Settings
        </button>
        <button
          className="profile-stats-btn"
          onClick={() => setShowStats(true)}
        >
          View Statistics
        </button>
        {role === "admin" && (
          <button
            onClick={(e) => navigate("/admin/users")}
            className="admin-controls-btn"
          >
            Admin Controls
          </button>
        )}
        {role === "trainer" && (
          <button
            onClick={(e) => navigate("/trainer-profile")}
            className="trainer-profile"
          >
            Trainer Profile
          </button>
        )}

        {/*Profile Modal */}
        {showModal && (
          <div className="profile-modal">
            <div className="modal-content">
              <h1 className="modal-title">Edit Profile</h1>
              <input
                className="modal-input"
                value={editName}
                type="text"
                onChange={handleNameChange}
                placeholder="Enter your name"
              />
              <button className="modal-save" onClick={handleSaveName}>
                Save
              </button>
              <button className="modal-close" onClick={closeModal}>
                X
              </button>
            </div>
          </div>
        )}

        {/* Settings Modal */}
        {showSettings && (
          <div className="profile-modal">
            <div className="modal-content">
              <h1 className="modal-title">Settings</h1>
              <div className="settings-grid">
                <div className="settings-row">
                  <span className="settings-label">Dark Mode</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={darkMode}
                      onChange={handleToggleDarkMode}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="settings-row">
                  <span className="settings-label">Notifications</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={notifications}
                      onChange={handleToggleNotifications}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="settings-row">
                  <span className="settings-label">Language</span>
                  <select className="modal-input" style={{ maxWidth: "120px" }}>
                    <option>English</option>
                  </select>
                </div>
                <div className="settings-row">
                  <span className="settings-label">Privacy</span>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="settings-row">
                  <span className="settings-label">Show Tips</span>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
              <button className="modal-close" onClick={closeSettings}>
                ×
              </button>
            </div>
          </div>
        )}
        {showStats && (
          <div className="profile-modal">
            <div
              className="modal-content"
              style={{ minWidth: "500px", maxWidth: "95vw" }}
            >
              <h1 className="modal-title">Statistics</h1>
              <div className="stats-edit-row">
                <label>Current Weight:</label>
                <input
                  className="stats-input"
                  type="number"
                  value={currentWeight}
                  onChange={handleWeightChange}
                  min="0"
                />
              </div>
              <div className="stats-edit-row">
                <label>Weight Goal:</label>
                <input
                  className="stats-input"
                  type="number"
                  value={weightGoal}
                  onChange={handleWeightGoalChange}
                  min="0"
                />
              </div>
              <div className="stats-edit-row">
                <label>Body Fat %:</label>
                <input
                  className="stats-input"
                  type="number"
                  value={bodyFat}
                  onChange={handleBodyFatChange}
                  min="0"
                  max="100"
                />
              </div>
              <div className="stats-edit-row">
                <label>Muscle Mass (kg):</label>
                <input
                  className="stats-input"
                  type="number"
                  value={muscleMass}
                  onChange={handleMuscleMassChange}
                  min="0"
                />
              </div>
              <div className="stats-edit-row">
                <label>Workout Streak (days):</label>
                <input
                  className="stats-input"
                  type="number"
                  value={workoutStreak}
                  onChange={(e) => setWorkoutStreak(e.target.value)}
                  min="0"
                />
              </div>
              <div className="stats-edit-row">
                <label>Fitness Goals:</label>
                <input
                  className="stats-input"
                  type="text"
                  value={fitnessGoals}
                  onChange={handleFitnessGoalsChange}
                  placeholder="e.g. Run 5k, Build muscle"
                />
              </div>
              <div className="stats-edit-row">
                <label>Personal Bests (kg):</label>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <input
                    className="stats-input"
                    type="number"
                    value={personalBests.bench}
                    onChange={(e) =>
                      handlePersonalBestChange("bench", e.target.value)
                    }
                    min="0"
                    placeholder="Bench"
                    style={{ width: "70px" }}
                  />
                  <input
                    className="stats-input"
                    type="number"
                    value={personalBests.squat}
                    onChange={(e) =>
                      handlePersonalBestChange("squat", e.target.value)
                    }
                    min="0"
                    placeholder="Squat"
                    style={{ width: "70px" }}
                  />
                  <input
                    className="stats-input"
                    type="number"
                    value={personalBests.deadlift}
                    onChange={(e) =>
                      handlePersonalBestChange("deadlift", e.target.value)
                    }
                    min="0"
                    placeholder="Deadlift"
                    style={{ width: "70px" }}
                  />
                </div>
              </div>
              <div
                className="stats-edit-row"
                style={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                <label style={{ marginBottom: "0.5rem" }}>
                  Weight History:
                </label>
                <div
                  style={{
                    width: "100%",
                    maxHeight: "120px",
                    overflowY: "auto",
                    background: "#f6f6fa",
                    borderRadius: "8px",
                    padding: "0.5rem 1rem",
                  }}
                >
                  {weightHistory.map((entry, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.3rem",
                      }}
                    >
                      <span>{entry.date}</span>
                      <span>{entry.weight} kg</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="modal-close"
                onClick={() => setShowStats(false)}
              >
                ×
              </button>
            </div>
          </div>
        )}
        <button onClick={handleLogOut} className="profile-signout">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
