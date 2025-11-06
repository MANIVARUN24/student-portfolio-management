import React from "react";

const StudentManagement = () => {
  const students = [
    {
      name: "Alex Johnson",
      email: "alex.johnson@student.edu",
      totalProjects: 3,
      completed: 1,
      rating: 4.5,
      lastActive: "2024-03-15",
    },
    {
      name: "Emma Davis",
      email: "emma.davis@student.edu",
      totalProjects: 2,
      completed: 1,
      rating: 4.8,
      lastActive: "2024-03-14",
    },
    {
      name: "Michael Chen",
      email: "michael.chen@student.edu",
      totalProjects: 4,
      completed: 2,
      rating: 4.2,
      lastActive: "2024-03-13",
    },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Student Management</h2>
      <p style={styles.subText}>Manage and review student performance and activity.</p>

      <div style={styles.grid}>
        {students.map((student, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.name}>{student.name}</span>
              <span style={styles.rating}>⭐ {student.rating}</span>
            </div>
            <p style={styles.email}>{student.email}</p>

            <div style={styles.infoRow}>
              <p>
                <b>Total Projects:</b> {student.totalProjects}
              </p>
              <p>
                <b>Completed:</b> {student.completed}
              </p>
            </div>

            <p style={{ fontSize: "0.9rem", color: "#555" }}>
              <b>Last Active:</b> {student.lastActive}
            </p>

            <button style={styles.viewButton}>View Profile</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: "#f8f9fb",
    minHeight: "100vh",
    padding: "2rem",
  },
  heading: {
    color: "#111827",
    fontSize: "1.5rem",
    marginBottom: "0.25rem",
  },
  subText: {
    color: "#6b7280",
    marginBottom: "1.5rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    padding: "1.5rem",
    border: "1px solid #e5e7eb",
    transition: "transform 0.2s ease",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.5rem",
  },
  name: {
    fontWeight: "600",
    fontSize: "1.1rem",
    color: "#111827",
  },
  rating: {
    color: "#fbbf24",
    fontWeight: "600",
  },
  email: {
    fontSize: "0.95rem",
    color: "#374151",
    marginBottom: "0.75rem",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    color: "#4b5563",
    marginBottom: "0.75rem",
  },
  viewButton: {
    width: "100%",
    background: "#111827",
    color: "#fff",
    border: "none",
    padding: "0.6rem",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "0.5rem",
    transition: "background 0.2s ease",
  },
};

export default StudentManagement;
