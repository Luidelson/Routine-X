import React from "react";
import "./CommunityForum.css";

export default function CommunityForum() {
  return (
    <div className="community-section-container">
      <div className="community-section-hero">
        <h1>💬 Forum</h1>
        <p>
          Ask questions, share tips, and motivate each other in a friendly
          space.
        </p>
      </div>
      <div className="community-section-card">
        <h2>Recent Topics</h2>
        <ul className="forum-list">
          <li>How do you stay motivated?</li>
          <li>Best post-workout meals?</li>
          <li>Share your progress!</li>
        </ul>
        <button className="community-section-btn">Start a Topic</button>
      </div>
    </div>
  );
}
