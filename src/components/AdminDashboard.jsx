import React, { useState, useEffect } from "react";

export default function AdminDashboard({ allProjects, provideFeedback }) {
  const [projects, setProjects] = useState([]);
  const [selectedTab, setSelectedTab] = useState("projects");
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Assign student names automatically if not set
  useEffect(() => {
    if (allProjects && allProjects.length > 0) {
      const updated = allProjects.map((p, i) => ({
        ...p,
        student:
          p.student ||
          (i === 0
            ? "Alex Johnson"
            : i === 1
            ? "Emma Davis"
            : i === 2
            ? "Michael Chen"
            : `Student ${i + 1}`),
      }));
      setProjects(updated);
    }
  }, [allProjects]);

  // === Dashboard Stats ===
  const totalStudents = new Set(projects.map((p) => p.student)).size;
  const totalSubmissions = projects.length;
  const pendingReviews = projects.filter(
    (p) => p.status === "pending-review"
  ).length;
  const avgRating =
    projects.filter((p) => p.rating).length > 0
      ? (
          projects.reduce((sum, p) => sum + (parseFloat(p.rating) || 0), 0) /
          projects.filter((p) => p.rating).length
        ).toFixed(1)
      : "N/A";

  // === Student Summary ===
  const students = Array.from(
    projects.reduce((map, project) => {
      const existing = map.get(project.student) || {
        name: project.student,
        email: `${project.student.split(" ")[0].toLowerCase()}@student.edu`,
        totalProjects: 0,
        completed: 0,
        avgRating: 0,
        lastActive: project.endDate,
      };
      existing.totalProjects += 1;
      if (project.status === "reviewed") existing.completed += 1;
      existing.avgRating += parseFloat(project.rating || 0);
      existing.lastActive = project.endDate;
      map.set(project.student, existing);
      return map;
    }, new Map())
  ).map((s) => ({
    ...s,
    avgRating: s.totalProjects
      ? (s.avgRating / s.totalProjects).toFixed(1)
      : "N/A",
  }));

  // === Handle Review Submit ===
  const handleReviewSubmit = (feedback, rating, status) => {
    if (!selectedProject) return;

    const idx = projects.findIndex((p) => p.title === selectedProject.title);
    if (idx < 0) return;

    const updatedProject = {
      ...projects[idx],
      feedback,
      rating,
      status,
    };

    const updatedProjects = [...projects];
    updatedProjects[idx] = updatedProject;
    setProjects(updatedProjects);

    provideFeedback(idx, feedback, rating, status);
    setSelectedProject(null);
    alert(`✅ Review submitted for "${updatedProject.title}"`);
  };

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "2rem" }}>
      <h2 style={{ fontWeight: "bold", color: "#232323" }}>Admin Dashboard</h2>
      <p style={{ color: "#555" }}>Welcome, Prof. Sarah Wilson</p>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          margin: "1.5rem 0",
        }}
      >
        <StatBox label="Total Students" value={totalStudents} icon="🎓" />
        <StatBox label="Total Submissions" value={totalSubmissions} icon="📄" />
        <StatBox label="Pending Reviews" value={pendingReviews} icon="🕒" />
        <StatBox label="Avg Rating" value={avgRating} icon="⭐" />
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
        <button
          style={tabStyle(selectedTab === "projects")}
          onClick={() => setSelectedTab("projects")}
        >
          Project Submissions
        </button>
        <button
          style={tabStyle(selectedTab === "students")}
          onClick={() => setSelectedTab("students")}
        >
          Student Management
        </button>
        <button
          style={tabStyle(selectedTab === "analytics")}
          onClick={() => setSelectedTab("analytics")}
        >
          Analytics
        </button>
      </div>

      {/* Tabs Content */}
      {selectedTab === "projects" && (
        <ProjectSubmissions
          projects={projects}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          handleReviewSubmit={handleReviewSubmit}
        />
      )}

      {selectedTab === "students" && (
        <StudentManagement
          students={students}
          allProjects={projects}
          onView={setSelectedStudent}
        />
      )}

      {selectedTab === "analytics" && <AnalyticsSection projects={projects} />}

      {/* Modal */}
      {selectedStudent && (
        <StudentProfileModal
          student={selectedStudent}
          allProjects={projects}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}

/* =============== Analytics Section =============== */
function AnalyticsSection({ projects }) {
  const total = projects.length;
  const reviewed = projects.filter((p) => p.status === "reviewed").length;
  const completionRate = total > 0 ? Math.round((reviewed / total) * 100) : 0;

  const techCount = {};
  projects.forEach((p) => {
    p.tags.forEach((tag) => {
      techCount[tag] = (techCount[tag] || 0) + 1;
    });
  });
  const popularTechs = Object.entries(techCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  return (
    <div>
      <h3 style={{ marginBottom: "1rem", color: "#232323" }}>
        Analytics & Reports
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
        }}
      >
        {/* Submission Trends */}
        <div style={analyticsCard}>
          <h4>Submission Trends</h4>
          <div style={trendItem}>
            <span>This Week</span>
            <span style={trendBadge}>+12%</span>
          </div>
          <div style={trendItem}>
            <span>This Month</span>
            <span style={trendBadge}>+8%</span>
          </div>
          <div style={trendItem}>
            <span>Completion Rate</span>
            <span style={trendBadge}>{completionRate}%</span>
          </div>
        </div>

        {/* Popular Technologies */}
        <div style={analyticsCard}>
          <h4>Popular Technologies</h4>
          {popularTechs.map(([tech, count], i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "0.7rem",
              }}
            >
              <span>{tech}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <div
                  style={{
                    height: "6px",
                    width: `${count * 25}px`,
                    background: "#3b82f6",
                    borderRadius: "5px",
                  }}
                ></div>
                <span style={{ fontSize: "0.8rem", color: "#555" }}>{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =============== Project Submissions =============== */
function ProjectSubmissions({
  projects,
  selectedProject,
  setSelectedProject,
  handleReviewSubmit,
}) {
  const [filter, setFilter] = useState("All");
  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.status === filter);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "1.5rem",
        alignItems: "start",
      }}
    >
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Project Submissions</h4>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: "0.4rem", borderRadius: "8px", border: "1px solid #ccc" }}
          >
            <option>All</option>
            <option>pending-review</option>
            <option>reviewed</option>
            <option>needs-revision</option>
          </select>
        </div>

        {filtered.map((p, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              borderRadius: "8px",
              padding: "1rem",
              marginTop: "1rem",
              boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
            onClick={() => setSelectedProject(p)}
          >
            <h4>{p.title}</h4>
            <p style={{ color: "#555" }}>by {p.student}</p>
            <p>{p.description}</p>

            <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
              {p.tags.map((tag, j) => (
                <span
                  key={j}
                  style={{
                    background: "#f3f4f6",
                    borderRadius: "6px",
                    padding: "2px 6px",
                    fontSize: "0.8rem",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <p style={{ fontSize: "0.8rem", color: "#888" }}>Submitted: {p.endDate}</p>

            {p.feedback && (
              <p style={{ fontSize: "0.85rem", marginTop: "0.3rem" }}>
                💬 <strong>Feedback:</strong> {p.feedback}
              </p>
            )}
            {p.rating && (
              <p style={{ fontSize: "0.85rem", color: "#facc15" }}>
                ⭐ Rating: {p.rating}/5
              </p>
            )}
            {p.status && (
              <p
                style={{
                  fontSize: "0.8rem",
                  color:
                    p.status === "reviewed"
                      ? "#16a34a"
                      : p.status === "needs-revision"
                      ? "#dc2626"
                      : "#a3a3a3",
                }}
              >
                📌 Status: {p.status}
              </p>
            )}
          </div>
        ))}
      </div>

      <ReviewPanel
        selectedProject={selectedProject}
        handleReviewSubmit={handleReviewSubmit}
      />
    </div>
  );
}

/* =============== Review Panel =============== */
function ReviewPanel({ selectedProject, handleReviewSubmit }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "1rem",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
      }}
    >
      {selectedProject ? (
        <>
          <h4>{selectedProject.title}</h4>
          <textarea
            id="feedback"
            placeholder="Write feedback..."
            style={{
              width: "100%",
              height: "100px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              padding: "0.6rem",
              marginBottom: "1rem",
            }}
          />
          <select
            id="rating"
            defaultValue=""
            style={{
              width: "100%",
              borderRadius: "8px",
              padding: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <option value="" disabled>
              Select Rating
            </option>
            <option value="1">⭐ 1</option>
            <option value="2">⭐ 2</option>
            <option value="3">⭐ 3</option>
            <option value="4">⭐ 4</option>
            <option value="5">⭐ 5</option>
          </select>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              style={reviseBtn}
              onClick={() =>
                handleReviewSubmit(
                  document.getElementById("feedback").value,
                  document.getElementById("rating").value,
                  "needs-revision"
                )
              }
            >
              Needs Revision
            </button>
            <button
              style={approveBtn}
              onClick={() =>
                handleReviewSubmit(
                  document.getElementById("feedback").value,
                  document.getElementById("rating").value,
                  "reviewed"
                )
              }
            >
              Approve
            </button>
          </div>
        </>
      ) : (
        <p>Select a submission to review 💬</p>
      )}
    </div>
  );
}

/* =============== Student Management =============== */
function StudentManagement({ students, allProjects, onView }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        gap: "1.5rem",
      }}
    >
      {students.map((s, i) => (
        <div
          key={i}
          style={{
            background: "#fff",
            borderRadius: "10px",
            padding: "1rem 1.2rem",
            boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
          }}
        >
          <h4>{s.name}</h4>
          <p>{s.email}</p>
          <p>Total Projects: {s.totalProjects}</p>
          <p>Completed: {s.completed}</p>
          <p>Last Active: {s.lastActive}</p>
          <p style={{ color: "#facc15" }}>⭐ {s.avgRating}</p>
          <button
            style={{
              width: "100%",
              marginTop: "0.5rem",
              border: "none",
              padding: "0.6rem",
              borderRadius: "8px",
              background: "#0a0a23",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={() => onView(s)}
          >
            View Profile
          </button>
        </div>
      ))}
    </div>
  );
}

/* =============== Student Modal =============== */
function StudentProfileModal({ student, allProjects, onClose }) {
  const studentProjects = allProjects.filter(
    (p) => p.student === student.name
  );

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          width: "80%",
          maxHeight: "80vh",
          overflowY: "auto",
          padding: "2rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h3>{student.name}</h3>
        <p>{student.email}</p>
        <p>⭐ Average Rating: {student.avgRating}</p>
        <p>Total Projects: {student.totalProjects}</p>
        <p>Completed: {student.completed}</p>
        <p>Last Active: {student.lastActive}</p>

        <hr style={{ margin: "1rem 0" }} />
        <h4>Projects</h4>

        {studentProjects.length > 0 ? (
          studentProjects.map((proj, i) => (
            <div
              key={i}
              style={{
                background: "#f9fafb",
                borderRadius: "8px",
                padding: "1rem",
                marginBottom: "1rem",
              }}
            >
              <h5>{proj.title}</h5>
              <p>{proj.description}</p>
              <p>Status: {proj.status}</p>
              <p>Progress: {proj.progress}%</p>
              {proj.feedback && <p>Feedback: {proj.feedback}</p>}
              {proj.rating && <p>Rating: ⭐ {proj.rating}/5</p>}
            </div>
          ))
        ) : (
          <p>No projects found for this student.</p>
        )}

        <button
          onClick={onClose}
          style={{
            marginTop: "1rem",
            background: "#0a0a23",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "0.8rem 1.4rem",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

/* =============== Helper Styles =============== */
function StatBox({ label, value, icon }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "1rem",
        borderRadius: "10px",
        boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <div style={{ color: "#666", fontSize: "0.9rem" }}>
        {label} {icon}
      </div>
      <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{value}</div>
    </div>
  );
}

const analyticsCard = {
  background: "#fff",
  borderRadius: "10px",
  padding: "1.5rem",
  boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
};

const trendItem = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "0.6rem",
  fontSize: "0.9rem",
};

const trendBadge = {
  background: "#0a0a23",
  color: "#fff",
  borderRadius: "6px",
  padding: "0.2rem 0.6rem",
  fontSize: "0.75rem",
  fontWeight: "bold",
};

const tabStyle = (active) => ({
  background: active ? "#0a0a23" : "#fff",
  color: active ? "#fff" : "#232323",
  border: active ? "none" : "1px solid #ccc",
  borderRadius: "10px",
  padding: "0.6rem 1.4rem",
  cursor: "pointer",
  fontWeight: active ? "bold" : "normal",
});

const approveBtn = {
  flex: 1,
  background: "#22c55e",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "0.8rem",
  cursor: "pointer",
  fontWeight: "bold",
};

const reviseBtn = {
  flex: 1,
  background: "#ef4444",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "0.8rem",
  cursor: "pointer",
  fontWeight: "bold",
};
