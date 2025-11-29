import React, { useState } from "react";

export default function Signup({ onClose }) {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [institution, setInstitution] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role, institution }),
    });

    const data = await response.json();

    if (data.error) {
      alert(data.error);
    } else {
      alert("Signup successful! You can login now.");
      onClose();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "400px",
          padding: "20px",
          background: "#fff",
          borderRadius: "10px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ textAlign: "center" }}>Create Account</h3>

        {/* FORM */}
        <form onSubmit={handleSignup}>
          <label>Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          />

          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          />

          <label>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          >
            <option value="student">Student</option>
            <option value="admin">Teacher/Admin</option>
          </select>

          {role === "admin" && (
            <>
              <label>Institution</label>
              <input
                type="text"
                onChange={(e) => setInstitution(e.target.value)}
                style={{ width: "100%", padding: 10, marginBottom: 10 }}
              />
            </>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#0a0a23",
              color: "#fff",
              borderRadius: 8,
            }}
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
