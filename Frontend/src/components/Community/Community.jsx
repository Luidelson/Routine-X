import React from "react";
import "./Community.css";
import { Link } from "react-router-dom";

export default function Community() {
  return (
    <div className="community-container">
      <div className="community-hero">
        <h1>🏋️‍♂️ Community Hub</h1>
        <p>Connect, share, and grow with other gym members and trainers!</p>
      </div>
      <div className="community-cards">
        <div className="community-card">
          <h2>💬 Forum</h2>
          <p>Ask questions, share tips, and motivate each other.</p>
          <Link className="community-btn" to="/community/forum">
            Go to Forum
          </Link>
        </div>
        <div className="community-card">
          <h2>🥗 Nutrition & Recipes</h2>
          <p>Share recipes and nutrition tips with the community.</p>
          <Link className="community-btn" to="/community/nutrition">
            View Nutrition
          </Link>
        </div>
        <div className="community-card">
          <h2>🤝 Meetups</h2>
          <p>Find local gym meetups and events to join.</p>
          <Link className="community-btn" to="/community/meetups">
            Find Meetups
          </Link>
        </div>
      </div>
    </div>
  );
}
