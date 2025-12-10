import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <header className="header">
      <h1 className="header-title">
        Routine<span className="header-x">X </span>
        {/* mobile button idea */}
        {/* // */}
        {/* <button onClick={setOpenDropdown} className="profile-btn">
          <img className="profile-image"></img>Profile
          {openDropdown && (
            <ul className="dropdown-menu">
              <li>Settings</li>
              <li>Profile</li>
              <li>View Statistics</li>
              <li>Trainer Profile</li>
              <li>Logout</li>
            </ul>
          )}
        </button> */}
        {/* // */}
      </h1>
    </header>
  );
};

export default Header;
