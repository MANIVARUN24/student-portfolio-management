import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('');

  const handleRoleChange = (r) => {
    setRole(r);
    setEmail('');
    setPassword('');
    setInstitution('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, email, password, institution }),
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      onLogin({ role, email });

    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong! Check server connection.");
    }
  };

  const isAdmin = role === "admin";

  const theme = {
    background: isAdmin ? "#eef2ff" : "#f7f8fa",
    cardBg: "#ffffff",
    titleColor: isAdmin ? "#1e3a8a" : "#111827",
    buttonBg: isAdmin ? "#1e3a8a" : "#0a0a23",
  };

  const institutions = [
    "NIT Warangal",
    "IIT Hyderabad",
    "JNTU Hyderabad",
  ];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: theme.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: theme.cardBg,
          padding: "2rem",
          borderRadius: "16px",
          minWidth: "350px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "0.5rem",
            color: theme.titleColor,
          }}
        >
          {isAdmin ? "Teacher/Admin Portal" : "Student Portfolio Platform"}
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginBottom: "1.5rem",
          }}
        >
          {isAdmin
            ? "Review & manage student projects"
            : "Sign in to manage your portfolio"}
        </p>

        {/* Role Switch */}
        <div
          style={{
            display: "flex",
            background: "#f3f4f6",
            borderRadius: "999px",
            overflow: "hidden",
            marginBottom: "1rem",
          }}
        >
          <button
            type="button"
            onClick={() => handleRoleChange("student")}
            style={{
              flex: 1,
              padding: "0.6rem",
              fontWeight: "bold",
              cursor: "pointer",
              background: role === "student" ? "#ffffff" : "transparent",
              border: "none",
              color: role === "student" ? "#111827" : "#6b7280",
            }}
          >
            Student
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange("admin")}
            style={{
              flex: 1,
              padding: "0.6rem",
              fontWeight: "bold",
              cursor: "pointer",
              background: role === "admin" ? "#ffffff" : "transparent",
              border: "none",
              color: role === "admin" ? "#111827" : "#6b7280",
            }}
          >
            Admin/Teacher
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <label style={{ color: "#374151", fontSize: "0.9rem" }}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={inputBox}
          />

          {/* Institution dropdown for admins */}
          {isAdmin && (
            <>
              <label style={{ color: "#374151", fontSize: "0.9rem" }}>
                Select Institution
              </label>
              <select
                value={institution}
                required
                onChange={(e) => setInstitution(e.target.value)}
                style={inputBox}
              >
                <option value="" disabled>Select Institution</option>
                {institutions.map((inst) => (
                  <option key={inst} value={inst}>
                    {inst}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* Password */}
          <label style={{ color: "#374151", fontSize: "0.9rem" }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            style={inputBox}
          />

          {/* Sign-in Button */}
          <button className="login-btn" type="submit" style={{
            width: "100%",
            padding: "0.9rem",
            background: theme.buttonBg,
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            marginTop: "0.5rem",
            cursor: "pointer",
            fontSize: "1rem",
          }}>
            Sign in as {isAdmin ? "Teacher/Admin" : "Student"}
          </button>
        </form>
      </div>
    </div>
  );
};

const inputBox = {
  width: "100%",
  padding: "0.8rem",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  backgroundColor: "#ffffff",
  marginBottom: "1rem",
  fontSize: "0.95rem",
};

export default Login;
