import React, { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Login = ({ onLogin }) => {
  const [role, setRole] = useState("student");
  const [page, setPage] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // 🔐 CAPTCHA STATES
  const [captchaText, setCaptchaText] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");

  // Generate CAPTCHA
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let text = "";
    for (let i = 0; i < 6; i++) {
      text += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptchaText(text);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    if (userCaptcha !== captchaText) {
      alert("Captcha incorrect. Please try again.");
      generateCaptcha();
      return;
    }

    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();
      if (data.error) return alert(data.error);

      onLogin(data);
    } catch (err) {
      console.error(err);
      alert("Server not responding");
    }
  };

  // SIGNUP
  const handleSignup = async (e) => {
    e.preventDefault();

    if (userCaptcha !== captchaText) {
      alert("Captcha incorrect. Please try again.");
      generateCaptcha();
      return;
    }

    try {
      const res = await fetch(`${API}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      if (data.error) return alert(data.error);

      alert("Account created! Please login.");
      setPage("login");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  // ⭐ GOOGLE LOGIN
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

      const res = await fetch(`${API}/api/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (data.error) return alert(data.error);

      onLogin(data);
    } catch (err) {
      console.error(err);
      alert("Google login failed");
    }
  };

  return (
    <div style={pageWrap}>
      <div style={leftPanel}>
        <div style={leftContent}>
          <h1 style={{ color: "#fff", margin: 0, fontSize: "2rem" }}>
            Student Portfolio
          </h1>
          <p style={{ color: "rgba(255,255,255,0.9)" }}>
            Showcase your projects and get feedback.
          </p>
          <div style={illustration} />
        </div>
      </div>

      <div style={rightPanel}>
        <div style={card}>
          <h2>{page === "login" ? "Welcome back" : "Create account"}</h2>
          <p style={{ color: "#666" }}>
            {page === "login" ? "Sign in to continue" : "Register your account"}
          </p>

          {/* ROLE SWITCH */}
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
              {/* LOGIN FORM */}
              <form onSubmit={handleLogin}>
                <label>Email</label>
                <input
                  style={input}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label>Password</label>
                <input
                  style={input}
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* CAPTCHA */}
                <label>Enter Captcha</label>
                <div style={captchaBox}>{captchaText}</div>

                <input
                  style={input}
                  type="text"
                  required
                  placeholder="Enter captcha"
                  value={userCaptcha}
                  onChange={(e) => setUserCaptcha(e.target.value)}
                />
                <button type="button" onClick={generateCaptcha} style={refreshBtn}>
                  Refresh Captcha
                </button>

                <button style={primaryBtn}>Sign in</button>
              </form>

              {/* GOOGLE LOGIN BUTTON */}
              <button style={googleBtn} onClick={handleGoogleLogin}>
                Sign in with Google
              </button>

              <p style={{ marginTop: 10 }}>
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
              {/* SIGNUP FORM */}
              <form onSubmit={handleSignup}>
                <label>Full Name</label>
                <input
                  style={input}
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <label>Email</label>
                <input
                  style={input}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label>Password</label>
                <input
                  style={input}
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* CAPTCHA */}
                <label>Enter Captcha</label>
                <div style={captchaBox}>{captchaText}</div>

                <input
                  style={input}
                  type="text"
                  required
                  placeholder="Enter captcha"
                  value={userCaptcha}
                  onChange={(e) => setUserCaptcha(e.target.value)}
                />
                <button type="button" onClick={generateCaptcha} style={refreshBtn}>
                  Refresh Captcha
                </button>

                <button style={primaryBtn}>Create account</button>
              </form>

              <p style={{ marginTop: 10 }}>
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

/* STYLES */
const pageWrap = { display: "flex", minHeight: "100vh", fontFamily: "Inter" };
const leftPanel = { flex: 1, background: "#2d6cdf", color: "#fff", padding: "3rem" };
const leftContent = { maxWidth: "420px" };
const illustration = { height: "150px", background: "rgba(255,255,255,0.1)" };
const rightPanel = { width: "420px", padding: "3rem", display: "flex", justifyContent: "center" };
const card = { width: "100%", background: "#fff", padding: "2rem", borderRadius: "12px" };
const roleSwitchWrap = { display: "flex", background: "#eee", padding: "6px", borderRadius: "50px", marginBottom: "15px" };
const roleBtn = { flex: 1, padding: "8px", border: "none", borderRadius: "50px", cursor: "pointer" };
const input = { width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "10px" };
const primaryBtn = { width: "100%", padding: "12px", background: "#2d6cdf", color: "#fff", border: "none", borderRadius: "8px", marginTop: "10px" };
const googleBtn = { width: "100%", padding: "10px", background: "#DB4437", color: "#fff", border: "none", borderRadius: "8px", marginTop: "10px" };
const captchaBox = { fontSize: "24px", fontWeight: "bold", letterSpacing: "4px", background: "#f1f1f1", padding: "10px", textAlign: "center", marginBottom: "10px", borderRadius: "8px" };
const refreshBtn = { padding: "8px 12px", background: "#444", color: "#fff", border: "none", borderRadius: "6px", marginBottom: "10px", cursor: "pointer" };

export default Login;
