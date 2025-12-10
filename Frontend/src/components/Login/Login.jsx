import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn, editName, setEditName }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [register, setRegister] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("username", data.name || "");
      setEditName(data.name || "");
      localStorage.setItem("role", data.role);
      setIsLoggedIn(true);
      navigate("/calendar");
    } else {
      setMessage(data.error || "Login failed.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password || !editName) {
      setError("Please enter name, email, and password.");
      return;
    }
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("username", data.name || "");
        setEditName(data.name || "");
        setMessage("Registration successful! Redirecting to calendar...");
        setIsLoggedIn(true);
        navigate("/calendar");
      } else {
        setError(data.error || "Registration failed.");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <h1 className="main-header">
        Routine<span className="title-x">X</span>
      </h1>
      <div className="login-modal">
        <div className="login-content">
          {!register ? (
            <>
              <h1 className="login-title">Welcome Back</h1>
              <p className="login-subtitle">Sign in to your account</p>
              {error && <p className="login-error">{error}</p>}
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                value={email}
                className="login-input"
                placeholder="Email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                className="login-input"
                placeholder="Password"
              />
              <button onClick={handleLogin} className="login-submit">
                Sign In
              </button>
              <button
                className="register-button"
                onClick={() => setRegister(true)}
              >
                Register
              </button>
            </>
          ) : (
            <>
              <h1 className="login-title">Create Account</h1>
              <p className="login-subtitle">Register a new account</p>
              {error && <p className="login-error">{error}</p>}
              <input
                onChange={(e) => setEditName(e.target.value)}
                type="text"
                value={editName}
                className="login-input"
                placeholder="Name"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                value={email}
                className="login-input"
                placeholder="Email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                className="login-input"
                placeholder="Password"
              />
              <button onClick={handleRegister} className="login-submit">
                Register
              </button>
              <button
                className="register-button"
                onClick={() => setRegister(false)}
              >
                Back to Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
