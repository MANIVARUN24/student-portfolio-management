import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const Login = ({ onLogin }) => {
  const [role, setRole] = useState("student");
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      onLogin(data);
    } catch (err) {
      console.error(err);
      alert("Server not responding!");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await res.json();
    if (data.error) return alert(data.error);

    alert("Account created! Please login.");
    setPage("login");
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const googleUser = await signInWithPopup(auth, provider);

      const userData = {
        name: googleUser.user.displayName,
        email: googleUser.user.email,
        photo: googleUser.user.photoURL,
        role,
      };

      const res = await fetch("http://localhost:5000/api/auth/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      onLogin(data);
    } catch (err) {
      alert("Google login failed.");
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#f7f7f7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "360px",
          padding: "25px",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 3px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          {page === "login" ? "Student Portfolio Platform" : "Create Account"}
        </h2>

        {/* Role Switch */}
        <div
          style={{
            display: "flex",
            background: "#eee",
            borderRadius: "20px",
            marginBottom: "15px",
          }}
        >
          <button
            onClick={() => setRole("student")}
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              background: role === "student" ? "#fff" : "transparent",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Student
          </button>

          <button
            onClick={() => setRole("admin")}
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              background: role === "admin" ? "#fff" : "transparent",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Admin/Teacher
          </button>
        </div>

        {/* LOGIN FORM */}
        {page === "login" && (
          <>
            <form onSubmit={handleLogin}>
              <label>Email</label>
              <input
                style={inp}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Password</label>
              <input
                style={inp}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button style={btn}>Login</button>
            </form>

            <button style={googleBtn} onClick={handleGoogleLogin}>
              Sign in with Google
            </button>

            <p style={{ textAlign: "center" }}>
              New user?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setPage("signup")}
              >
                Create account
              </span>
            </p>
          </>
        )}

        {/* SIGNUP FORM */}
        {page === "signup" && (
          <>
            <form onSubmit={handleSignup}>
              <label>Name</label>
              <input
                style={inp}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label>Email</label>
              <input
                style={inp}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Password</label>
              <input
                style={inp}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button style={btn}>Create Account</button>
            </form>

            <p style={{ textAlign: "center" }}>
              Already have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setPage("login")}
              >
                Login
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

const inp = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
};

const btn = {
  width: "100%",
  padding: "12px",
  background: "#0a0a23",
  color: "white",
  border: "none",
  borderRadius: "8px",
  marginBottom: "10px",
  cursor: "pointer",
};

const googleBtn = {
  width: "100%",
  padding: "12px",
  background: "#DB4437",
  color: "white",
  border: "none",
  borderRadius: "8px",
  marginTop: "10px",
  cursor: "pointer",
};

export default Login;
