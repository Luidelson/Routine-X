import "./Membership.css";
import React, { useState } from "react";

const Membership = () => {
  const role = localStorage.getItem("role");
  const [editMembership, setEditMembership] = useState(false);
  return (
    <div className="membership-container">
      <h1 className="membership-title">Membership Page</h1>
      <p className="membership-description">
        Choose your membership plan and enjoy exclusive benefits!
      </p>
      <div>
        <h2 className="membership-title">Membership Plans</h2>
        <ul className="membership-plans">
          <li className="membership-plan basic-plan">
            <span className="plan-icon" role="img" aria-label="basic">
              🥉
            </span>
            <div className="plan-title">Basic Plan</div>
            <div className="plan-price">$5/month</div>
            <ul className="plan-features">
              <li>Nutrition features</li>
              <li>Community access</li>
              <li>Forum & meetups</li>
            </ul>
            <button className="membership-select">Select</button>
            {role === "admin" && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  className="membership-edit-btn"
                  onClick={() => setEditMembership(true)}
                >
                  <span role="img" aria-label="edit">
                    ✏️
                  </span>{" "}
                  Edit
                </button>
              </div>
            )}
          </li>
          <li className="membership-plan trainer-plan">
            <span className="plan-icon" role="img" aria-label="trainer">
              🏆
            </span>
            <div className="plan-title">Trainer Plan</div>
            <div className="plan-price">$10/month</div>
            <ul className="plan-features">
              <li>Client management</li>
              <li>Workout tracking</li>
              <li>Trainer profile</li>
            </ul>
            <button className="membership-select">Select</button>
            {role === "admin" && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  className="membership-edit-btn"
                  onClick={() => setEditMembership(true)}
                >
                  <span role="img" aria-label="edit">
                    ✏️
                  </span>{" "}
                  Edit
                </button>
              </div>
            )}
          </li>
          <li className="membership-plan exclusive-plan">
            <span className="plan-icon" role="img" aria-label="exclusive">
              💎
            </span>
            <div className="plan-title">Exclusive Plan</div>
            <div className="plan-price">$20/month</div>
            <p>- Keep track of clients' workouts</p>
            <p>- Access to AI</p>
            <button className="membership-select">Select</button>
            {role === "admin" && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  className="membership-edit-btn"
                  onClick={() => setEditMembership(true)}
                >
                  <span role="img" aria-label="edit">
                    ✏️
                  </span>{" "}
                  Edit
                </button>
              </div>
            )}
          </li>
        </ul>
        {/* {editMembership && (
          <div className="edit-membership-form">
            <div className="edit-membership-content">
              Edit Membership Form
              <input type="text" placeholder="Membership Name" />
              <input type="text" placeholder="Price" />
              <textarea placeholder="Features"></textarea>
              <button>Save</button>
              <button onClick={(e) => setEditMembership(false)}>Cancel</button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Membership;
