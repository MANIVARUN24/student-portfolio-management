import React from "react";

const Navbar = ({ isAdmin, onLogout }) => {
  return (
    <nav
      style={{
        padding: "1rem 2rem",
        background: "#0a0a23",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
        Student Portfolio Platform
      </span>

      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <span style={{ fontSize: "1rem", color: "#e5e7eb" }}>
          {isAdmin ? "Admin/Teacher" : "Student"}
        </span>

        <button
          onClick={onLogout}
          style={{
            background: "#ffffff",
            color: "#0a0a23",
            border: "none",
            borderRadius: "8px",
            padding: "0.5rem 1.2rem",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "0.95rem",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => (e.target.style.background = "#e5e7eb")}
          onMouseOut={(e) => (e.target.style.background = "#ffffff")}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
