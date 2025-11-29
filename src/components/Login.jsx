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
    if (!email || !password) return alert("Enter credentials");
    const data = { email, role, name: email.split("@")[0] };
    onLogin(data);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return alert("Fill all fields");
    alert("Account created locally. Please login.");
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

      onLogin(userData);
    } catch (err) {
      alert("Google login failed.");
    }
  };

  return (
    <div style={pageWrap}>
      <div style={leftPanel}>
        <div style={leftContent}>
          <h1 style={{ color: "#fff", margin: 0, fontSize: "2rem" }}>
            Student Portfolio
          </h1>
          <p style={{ color: "rgba(255,255,255,0.9)", marginTop: "0.5rem" }}>
            Showcase your projects, track progress, and get feedback from your
            mentors.
          </p>
          <div style={illustration} aria-hidden />
        </div>
      </div>

      <div style={rightPanel}>
        <div style={card}>
          <h2 style={{ marginBottom: "0.25rem" }}>
            {page === "login" ? "Welcome back" : "Create account"}
          </h2>
          <p style={{ marginTop: 0, color: "#666" }}>
            {page === "login"
              ? "Sign in to continue"
              : "Register a new account"}
          </p>

          <div style={roleSwitchWrap}>
            <button
              onClick={() => setRole("student")}
              style={{
                ...roleBtn,
                background: role === "student" ? "#fff" : "transparent",
              }}
            >
              Student
            </button>
            <button
              onClick={() => setRole("admin")}
              style={{
                ...roleBtn,
                background: role === "admin" ? "#fff" : "transparent",
              }}
            >
              Admin / Teacher
            </button>
          </div>

          {page === "login" ? (
            <>
              <form onSubmit={handleLogin}>
                <label style={label}>Email</label>
                <input
                  style={input}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label style={label}>Password</label>
                <input
                  style={input}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button style={primaryBtn}>Sign in</button>
              </form>

              <div style={{ textAlign: "center", marginTop: 12 }}>
                <button
                  style={googleBtn}
                  onClick={handleGoogleLogin}
                >
                  Sign in with Google
                </button>
              </div>

              <p style={{ textAlign: "center", marginTop: 12 }}>
                New here?{" "}
                <span
                  style={{ color: "#2d6cdf", cursor: "pointer" }}
                  onClick={() => setPage("signup")}
                >
                  Create account
                </span>
              </p>
            </>
          ) : (
            <>
              <form onSubmit={handleSignup}>
                <label style={label}>Full name</label>
                <input
                  style={input}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <label style={label}>Email</label>
                <input
                  style={input}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label style={label}>Password</label>
                <input
                  style={input}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button style={primaryBtn}>Create account</button>
              </form>

              <p style={{ textAlign: "center", marginTop: 12 }}>
                Already have an account?{" "}
                <span
                  style={{ color: "#2d6cdf", cursor: "pointer" }}
                  onClick={() => setPage("login")}
                >
                  Sign in
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const pageWrap = {
  display: "flex",
  minHeight: "100vh",
  fontFamily:
    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
};

const leftPanel = {
  flex: 1,
  background:
    "linear-gradient(135deg, #2d6cdf 0%, #7b61ff 100%)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "3rem",
  minHeight: "400px",
};

const leftContent = {
  maxWidth: "420px",
};

const illustration = {
  marginTop: "1.25rem",
  width: "100%",
  height: "160px",
  borderRadius: "12px",
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
  boxShadow: "inset 0 -20px 40px rgba(0,0,0,0.08)",
};

const rightPanel = {
  width: "420px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "3rem",
};

const card = {
  width: "100%",
  background: "#fff",
  borderRadius: "12px",
  padding: "1.75rem",
  boxShadow: "0 6px 30px rgba(11,16,28,0.08)",
};

const roleSwitchWrap = {
  display: "flex",
  background: "#f3f4f6",
  borderRadius: "999px",
  padding: "6px",
  margin: "1rem 0",
};

const roleBtn = {
  flex: 1,
  padding: "8px 10px",
  border: "none",
  borderRadius: "999px",
  fontWeight: "600",
  cursor: "pointer",
  background: "transparent",
};

const label = {
  display: "block",
  marginBottom: 6,
  fontSize: "0.9rem",
  color: "#333",
};
const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #e6e7eb",
};
const primaryBtn = {
  width: "100%",
  padding: "12px",
  background: "#2d6cdf",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: 6,
};
const googleBtn = {
  width: "100%",
  padding: "10px",
  background: "#DB4437",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default Login;
