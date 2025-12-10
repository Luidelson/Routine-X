import AdminUsers from "./components/AdminUser/AdminUsers";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TrainerProfile from "./components/TrainerProfile/TrainerProfile";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Profile from "./components/Profile/Profile";
import "./styles/App.css";
import NavBar from "./components/Navbar/Navbar";
import Workout from "./components/Workout/Workout";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Calendar from "./components/Calendar/Calendar";
import Membership from "./components/Memberships/Membership";
import Clients from "./components/Clients/Clients";
import ClientHistory from "./components/Clients/Client-History";
import Community from "./components/Community/Community";
import CommunityForum from "./components/CommunityForum/CommunityForum";
import CommunityNutrition from "./components/CommunityNutrition/CommunityNutrition";
import CommunityMeetups from "./components/CommunityMeetups/CommunityMeetups";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [editName, setEditName] = useState(
    localStorage.getItem("username") || ""
  );
  const [calendarWorkouts, setCalendarWorkouts] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  return (
    <div className="App">
      <Router>
        <div className="app-content">
          {isLoggedIn && (
            <>
              <Header />
              <NavBar />
            </>
          )}
          <Routes>
            <Route
              path="/"
              element={
                <Login
                  editName={editName}
                  setEditName={setEditName}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Calendar
                    setCalendarWorkouts={setCalendarWorkouts}
                    calendarWorkouts={calendarWorkouts}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    editName={editName}
                    setEditName={setEditName}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/membership"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Membership />
                </ProtectedRoute>
              }
            />
            <Route
              path="/workouts"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Workout
                    setCalendarWorkouts={setCalendarWorkouts}
                    calendarWorkouts={calendarWorkouts}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/clients"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Clients />
                </ProtectedRoute>
              }
            />
            <Route
              path="/client-history"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <ClientHistory />
                </ProtectedRoute>
              }
            />
            <Route path="/trainer-profile" element={<TrainerProfile />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/forum" element={<CommunityForum />} />
            <Route
              path="/community/nutrition"
              element={<CommunityNutrition />}
            />
            <Route path="/community/meetups" element={<CommunityMeetups />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
