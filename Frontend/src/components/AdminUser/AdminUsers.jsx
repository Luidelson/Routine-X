import React, { useState, useEffect } from "react";
import "./AdminUsers.css";

// Mock data
// const mockUsers = [
//   { id: 1, name: "Alex Johnson", role: "trainer", email: "alex@gym.com" },
//   { id: 2, name: "Sarah Lee", role: "member", email: "sarah@gym.com" },
//   { id: 3, name: "Mike Brown", role: "member", email: "mike@gym.com" },
//   { id: 4, name: "Jane Smith", role: "admin", email: "jane@gym.com" },
// ];

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/all/users").then((res) =>
      res
        .json()
        .then((data) => setUsers(data.map((u) => ({ ...u, id: u._id }))))
        .catch((err) => {
          console.log(err);
        })
    );
  }, []);

  //delete user with admin rights
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    const res = await fetch(`http://localhost:5000/api/user/${userId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success) {
      setUsers(users.filter((u) => u._id !== userId));
      alert("User deleted!");
    } else {
      alert("Error deleting user: " + data.error);
    }
  };

  const handleChangeRole = (userId, newRole) => {
    fetch(`http://localhost:5000/api/user/${userId}/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: newRole }),
    })
      .then((res) => {
        res.json().then((data) => {
          setUsers((prev) =>
            prev.map((U) =>
              U.id === userId ? { ...U, ...data.user, id: U.id } : U
            )
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-users-container">
      <h1>All Users</h1>
      <input
        className="admin-users-search"
        type="text"
        placeholder="Search by name, email, or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="admin-users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <select
                  className={`role-badge role-${user.role}`}
                  value={user.role}
                  onChange={(e) => {
                    const newRole = e.target.value;
                    handleChangeRole(user._id, newRole);
                  }}
                >
                  <option value="admin">Admin</option>
                  <option value="trainer">Trainer</option>
                  <option value="member">Member</option>
                </select>
              </td>
              <td>
                <button
                  className="admin-delete-btn"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
