import React from "react";
import "./CommunityMeetups.css";

export default function CommunityMeetups() {
  return (
    <div className="community-section-container">
      <div className="community-section-hero">
        <h1>🤝 Meetups</h1>
        <p>
          Find local gym meetups and events to join and connect with others!
        </p>
      </div>
      <div className="community-section-card">
        <h2>Upcoming Meetups</h2>
        <ul className="meetup-list">
          <li>Saturday, Dec 6: HIIT Group at Main Gym</li>
          <li>Sunday, Dec 14: Nutrition Workshop</li>
          <li>Friday, Dec 19: Yoga in the Park</li>
        </ul>
        <button className="community-section-btn">View All Events</button>
      </div>
    </div>
  );
}
