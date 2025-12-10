import React, { useState } from "react";
import "./Clients.css";
import { useNavigate } from "react-router-dom";

const clients = [
  { id: 1, name: "Jane Doe", email: "jane@example.com", status: "Active" },
  { id: 2, name: "John Smith", email: "john@example.com", status: "Inactive" },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    status: "Active",
  },
  { id: 4, name: "Bob Brown", email: "bob@example.com", status: "Inactive" },
];

const Clients = () => {
  const navigate = useNavigate();
  const [messageModal, setMessageModal] = useState(false);
  const [activeClient, setActiveClient] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const clientMessages = activeClient ? messages[activeClient.id] || [] : [];

  function handleBack() {
    navigate("/trainer-profile");
  }
  function handleViewClient() {
    navigate("/client-history");
  }

  return (
    <div className="clients-page">
      <button onClick={handleBack} className="back-btn">
        Back
      </button>
      <h1 className="clients-title">Clients</h1>
      <div className="clients-grid">
        {clients.map((client) => (
          <div className="client-card" key={client.id}>
            <div className="client-avatar">{client.name[0]}</div>
            <div className="client-info">
              <h2>{client.name}</h2>
              <p>{client.email}</p>
              <span className={`client-status ${client.status.toLowerCase()}`}>
                {client.status}
              </span>
            </div>
            <button onClick={handleViewClient} className="client-action-btn">
              View
            </button>
            <button
              onClick={() => {
                setActiveClient(client);
                setMessageModal(true);
              }}
              className="client-action-btn"
            >
              Message
            </button>
          </div>
        ))}
      </div>
      {messageModal && activeClient && (
        <div className="message-modal">
          <div className="message-modal-content">
            <div className="message-modal-header">
              <span className="message-modal-avatar">
                {activeClient.name[0]}
              </span>
              <span className="message-modal-title">{activeClient.name}</span>
              <button
                className="message-modal-close"
                onClick={() => setMessageModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="message-modal-chat">
              {clientMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message-bubble ${
                    msg.sender === "me" ? "me" : "client"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="message-modal-input-row">
              <input
                type="text"
                className="message-modal-input"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button
                className="message-modal-send"
                onClick={() => {
                  if (newMessage.trim()) {
                    setMessages((prev) => ({
                      ...prev,
                      [activeClient.id]: [
                        ...(prev[activeClient.id] || []),
                        { sender: "me", text: newMessage },
                      ],
                    }));
                    setNewMessage("");
                  }
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;
