import React from "react";
import "./CommunityChallenges.css";

export default function CommunityChallenges() {
  return (
    <div className="community-section-container">
      <div className="community-section-hero">
        <h1>🏆 Challenges</h1>
        <p>
          Join weekly fitness challenges and track your progress with the
          community!
        </p>
      </div>
      <div className="community-section-card">
        <h2>Current Challenge</h2>
        <div className="challenge-box">
          <strong>December Push-Up Challenge</strong>
          <p>Do 50 push-ups every day this week!</p>
        </div>
        <button className="community-section-btn">Join Challenge</button>
      </div>
    </div>
  );
}
