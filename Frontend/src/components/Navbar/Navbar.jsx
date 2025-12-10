import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header.jsx";

const Navbar = () => {
  return (
    <nav className="Nav">
      <ul className="Nav-items">
        <li>
          <Link className="Nav-item" to="/Profile">
            <span role="img" aria-label="profile">
              👤
            </span>{" "}
            Profile
          </Link>
        </li>
        <li>
          <Link className="Nav-item" to="/Calendar">
            <span role="img" aria-label="calendar">
              📅
            </span>{" "}
            Calendar
          </Link>
        </li>
        <li>
          <Link className="Nav-item" to="/Workouts">
            <span role="img" aria-label="workouts">
              🏋️‍♂️
            </span>{" "}
            Workouts
          </Link>
        </li>
        <li>
          <Link className="Nav-item community-btn" to="/community">
            <span role="img" aria-label="community">
              💬
            </span>{" "}
            Community
          </Link>
        </li>
        <li>
          <Link className="Nav-item membership-btn" to="/membership">
            <span role="img" aria-label="membership">
              ⭐
            </span>{" "}
            Upgrade Plan
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
