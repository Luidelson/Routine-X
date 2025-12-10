import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TrainerProfile.css";

const mockTrainer = {
  name: "Arnold Schwarzenegger",
  photo:
    "https://hips.hearstapps.com/hmg-prod/images/body-builder-actor-and-future-governor-of-california-arnold-news-photo-83149175-1538148091.jpg?crop=1xw:0.8xh;center,top",
  bio: "Certified personal trainer with 8+ years experience helping clients achieve their fitness goals. Specialized in strength, nutrition, and HIIT.",
  specialties: ["Strength Training", "Nutrition", "HIIT", "Mobility"],
  certifications: ["NASM CPT", "Precision Nutrition", "CrossFit Level 1"],
  experience: "8 years",
  achievements: ["2022 Local Fitness Award", "100+ client transformations"],
  contact: {
    email: "alex.johnson@gym.com",
    phone: "(555) 123-4567",
    instagram: "@alexjohnsonfit",
  },
  services: ["Personal Training", "Group Classes", "Online Coaching"],
  clients: [
    { name: "Sarah Lee", progress: "Lost 20 lbs, gained muscle" },
    { name: "Mike Brown", progress: "Improved endurance, ran first 5K" },
  ],
  reviews: [
    {
      name: "Sarah Lee",
      rating: 5,
      text: "Alex is amazing! Helped me reach my goals.",
    },
    { name: "Mike Brown", rating: 4, text: "Great motivator and coach." },
  ],
  schedule: [
    { day: "Monday", slots: ["9:00 AM", "11:00 AM", "2:00 PM"] },
    { day: "Wednesday", slots: ["10:00 AM", "1:00 PM"] },
  ],
};

export default function TrainerProfile() {
  // Navigation handler for reviews

  const navigate = useNavigate();
  const [showEditServices, setShowEditServices] = useState(false);
  const [showEditContact, setShowEditContact] = useState(false);
  const [showEditSchedule, setShowEditSchedule] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showClients, setShowClients] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [trainer, setTrainer] = useState({ ...mockTrainer });

  function handleClients() {
    navigate("/clients");
  }

  function handleReviews() {
    setShowReviews((prev) => !prev);
  }

  function handleEditChange(field, value) {
    setTrainer((prev) => ({ ...prev, [field]: value }));
  }

  function handleEditArray(field, idx, value) {
    setTrainer((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === idx ? value : item)),
    }));
  }

  function handleAddSpecialty() {
    setTrainer((prev) => ({ ...prev, specialties: [...prev.specialties, ""] }));
  }
  function handleAddCertification() {
    setTrainer((prev) => ({
      ...prev,
      certifications: [...prev.certifications, ""],
    }));
  }

  return (
    <div className="trainer-profile-container">
      <div className="trainer-hero">
        <div className="edit-profile-topright">
          <button
            className="edit-profile-icon-btn"
            onClick={() => setShowEdit(true)}
            title="Edit Profile"
          >
            <span role="img" aria-label="edit">
              ✏️
            </span>
          </button>
        </div>
        <img src={trainer.photo} alt="Trainer" className="trainer-photo" />
        <div className="trainer-info">
          <h1>{trainer.name}</h1>
          <p className="trainer-bio">{trainer.bio}</p>
          <div className="trainer-tags">
            {trainer.specialties.map((spec, idx) => (
              <span key={idx} className="trainer-tag">
                {spec}
              </span>
            ))}
          </div>
          <div className="trainer-certifications">
            <strong>Certifications:</strong> {trainer.certifications.join(", ")}
          </div>
          <div className="trainer-experience">
            <strong>Experience:</strong> {trainer.experience}
          </div>
          <div className="trainer-achievements">
            <strong>Achievements:</strong> {trainer.achievements.join(", ")}
          </div>
        </div>
      </div>
      <div className="trainer-actions">
        <button
          className="trainer-btn contact-btn"
          onClick={() => setShowContact(!showContact)}
        >
          Contact Info
        </button>
        <button className="trainer-btn clients-btn" onClick={handleClients}>
          Clients
        </button>
        <button className="trainer-btn reviews-btn" onClick={handleReviews}>
          Reviews
        </button>
        <button
          className="trainer-btn schedule-btn"
          onClick={() => setShowSchedule(!showSchedule)}
        >
          Schedule
        </button>
      </div>
      {showEdit && (
        <div className="trainer-modal edit-modal-overlay">
          <div className="modal-content edit-modal-content">
            <h2>Edit Trainer Profile</h2>
            <label>Name:</label>
            <input
              type="text"
              value={trainer.name}
              onChange={(e) => handleEditChange("name", e.target.value)}
              className="modal-input"
            />
            <label>Bio:</label>
            <textarea
              value={trainer.bio}
              onChange={(e) => handleEditChange("bio", e.target.value)}
              className="modal-input modal-input-bio"
              rows={3}
            />
            <label>Specialties:</label>
            {trainer.specialties.map((spec, idx) => (
              <input
                key={idx}
                type="text"
                value={spec}
                onChange={(e) =>
                  handleEditArray("specialties", idx, e.target.value)
                }
                className="modal-input"
                style={{ marginBottom: "0.5rem" }}
              />
            ))}
            <button
              className="modal-save"
              onClick={handleAddSpecialty}
              style={{ marginBottom: "1rem" }}
            >
              + Add Specialty
            </button>
            <label>Certifications:</label>
            {trainer.certifications.map((cert, idx) => (
              <input
                key={idx}
                type="text"
                value={cert}
                onChange={(e) =>
                  handleEditArray("certifications", idx, e.target.value)
                }
                className="modal-input"
                style={{ marginBottom: "0.5rem" }}
              />
            ))}
            <button
              className="modal-save"
              onClick={handleAddCertification}
              style={{ marginBottom: "1rem" }}
            >
              + Add Certification
            </button>
            <button className="modal-close" onClick={() => setShowEdit(false)}>
              Close
            </button>
          </div>
        </div>
      )}
      {showContact && (
        <div className="trainer-modal">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2>Contact</h2>
            <button className="edit-profile-icon-btn" title="Edit Contact Info">
              <span role="img" aria-label="edit">
                ✏️
              </span>
            </button>
          </div>
          <p>Email: {mockTrainer.contact.email}</p>
          <p>Phone: {mockTrainer.contact.phone}</p>
          <p>Instagram: {mockTrainer.contact.instagram}</p>
        </div>
      )}
      {showClients && (
        <div className="trainer-modal">
          <h2>Clients</h2>
          <ul>
            {mockTrainer.clients.map((client) => (
              <li key={client.name}>
                <strong>{client.name}:</strong> {client.progress}
              </li>
            ))}
          </ul>
        </div>
      )}
      {showReviews && (
        <div className="trainer-modal">
          <h2>Reviews</h2>
          <ul>
            {mockTrainer.reviews.map((review, idx) => (
              <li key={idx}>
                <strong>{review.name}:</strong> {"★".repeat(review.rating)}{" "}
                {review.text}
              </li>
            ))}
          </ul>
        </div>
      )}
      {showSchedule && (
        <div className="trainer-modal">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2>Schedule</h2>
            <button className="edit-profile-icon-btn" title="Edit Schedule">
              <span role="img" aria-label="edit">
                ✏️
              </span>
            </button>
          </div>
          <ul>
            {mockTrainer.schedule.map((day) => (
              <li key={day.day}>
                <strong>{day.day}:</strong> {day.slots.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="trainer-services">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2>Services Offered</h2>
          <button className="edit-profile-icon-btn" title="Edit Services">
            <span role="img" aria-label="edit">
              ✏️
            </span>
          </button>
        </div>
        <ul>
          {mockTrainer.services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
