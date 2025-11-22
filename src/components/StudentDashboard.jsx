import React, { useState } from "react";

const student = { name: "Alex Johnson" };
const statusColors = {
  completed: "#22c55e",
  "in-progress": "#3b82f6",
  planning: "#facc15",
};

export default function StudentDashboard({ projects, addProject, updateProject }) {
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [activeTab, setActiveTab] = useState("My Projects");

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    startDate: "",
    endDate: "",
    tags: [],
    repoURL: "",
    liveURL: "",
    image: "",
    progress: 0,
  });

  const [newTag, setNewTag] = useState("");
  const [newImage, setNewImage] = useState("");

  const openEdit = (proj) => {
    setEditingProject(proj);
    setFormData({ ...proj });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProject) updateProject(formData);
    else addProject(formData);
    setShowForm(false);
    setEditingProject(null);
  };

  const totalProjects = projects.length;
  const completed = projects.filter((p) => p.status === "completed").length;
  const inProgress = projects.filter((p) => p.status === "in-progress").length;
  const milestones = "5/6";

  // ⭐ REPLACED DUMMY PROGRESS DATA WITH BACKEND DATA
  const progressData = projects.map((p) => ({
    title: p.title,
    progress: p.progress || 0,
    status: p.status || "in-progress",
    milestones: p.milestones || [],
  }));

  // Sample Feedback (kept same — unrelated)
  const feedbackData = [
    {
      project: "E-commerce Website",
      teacher: "Prof. Sarah Wilson",
      date: "2024-03-10",
      comment: "Excellent work on the user interface!",
      rating: 5,
    },
    {
      project: "Mobile App UI Design",
      teacher: "Dr. Emily Johnson",
      date: "2024-03-18",
      comment: "Good progress! Improve color contrast.",
      rating: 4,
    },
  ];

  return (
    <div style={{ background: "#f7f8fa", minHeight: "100vh", padding: "2rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ fontWeight: "bold", color: "#232323", margin: 0 }}>
            Welcome back, {student.name}
          </h2>
          <p style={{ color: "#555", marginTop: "0.3rem" }}>
            Manage your projects and portfolio
          </p>
        </div>

        {activeTab === "My Projects" && (
          <button
            onClick={() => {
              setEditingProject(null);
              setFormData({
                title: "",
                category: "",
                description: "",
                startDate: "",
                endDate: "",
                tags: [],
                repoURL: "",
                liveURL: "",
                image: "",
                progress: 0,
              });
              setShowForm(true);
            }}
            style={{
              background: "#0a0a23",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "0.6rem 1.2rem",
              fontWeight: "bold",
              cursor: "pointer",
              height: "fit-content",
            }}
          >
            + New Project
          </button>
        )}
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.8rem", flexWrap: "wrap" }}>
        <StatBox label="Total Projects" value={totalProjects} icon="📋" />
        <StatBox label="Completed" value={completed} icon="✅" />
        <StatBox label="In Progress" value={inProgress} icon="🟣" />
        <StatBox label="Milestones" value={milestones} icon="🔒" />
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
        {["My Projects", "Portfolio View", "Progress Tracking", "Feedback"].map((tab) => (
          <Tab
            key={tab}
            label={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </div>

      {/* My Projects */}
      {activeTab === "My Projects" && (
        <div>
          <h4 style={{ marginBottom: "1rem", color: "#232323" }}>My Projects</h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(370px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {projects.map((p, idx) => (
              <div key={idx} style={cardStyle}>
                <img src={p.image} alt={p.title} style={imgStyle} />
                <div style={{ padding: "1rem" }}>
                  <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{p.title}</div>
                  <div style={{ color: "#3b82f6", fontWeight: "500", marginBottom: "0.3rem" }}>
                    {p.category}
                  </div>
                  <p style={{ color: "#555", fontSize: "0.9rem", marginBottom: "0.6rem" }}>
                    {p.description}
                  </p>
                  <div style={{ fontWeight: "500", marginBottom: "0.3rem" }}>Progress</div>
                  <div style={progressOuter}>
                    <div
                      style={{
                        ...progressInner,
                        width: `${p.progress}%`,
                        background: statusColors[p.status],
                      }}
                    ></div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                      marginTop: "0.8rem",
                    }}
                  >
                    {p.tags?.map((tag, i) => (
                      <span key={i} style={tagStyle}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div style={{ textAlign: "right", marginTop: "0.8rem" }}>
                    <button style={editBtn} onClick={() => openEdit(p)}>
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Portfolio View */}
      {activeTab === "Portfolio View" && (
        <div style={{ textAlign: "center" }}>
          <h4 style={{ color: "#232323", marginBottom: "0.5rem" }}>Portfolio View</h4>
          <p style={{ color: "#555", marginBottom: "1.5rem" }}>
            This is how your portfolio will appear to visitors.
          </p>
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              overflow: "hidden",
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            {projects.slice(0, 1).map((p, idx) => (
              <div key={idx}>
                <img src={p.image} alt={p.title} style={{ width: "100%", maxHeight: "420px", objectFit: "cover" }} />
                <div style={{ padding: "1rem" }}>
                  <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{p.title}</div>
                  <div style={{ color: "#3b82f6", fontWeight: "500" }}>{p.category}</div>
                  <p style={{ marginTop: "0.6rem", color: "#555" }}>{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ⭐ BACKEND PROGRESS TRACKING TAB */}
      {activeTab === "Progress Tracking" && (
        <div>
          <h4 style={{ marginBottom: "1rem", color: "#232323" }}>Progress Tracking</h4>

          {progressData.length === 0 ? (
            <p style={{ color: "#777" }}>No projects added yet.</p>
          ) : (
            progressData.map((proj, index) => (
              <div
                key={index}
                style={{
                  background: "#fff",
                  borderRadius: "8px",
                  padding: "1rem 1.5rem",
                  marginBottom: "1.5rem",
                  boxShadow: "0 1px 5px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    marginBottom: "0.3rem",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{proj.title}</span>
                  <span
                    style={{
                      background: `${statusColors[proj.status]}20`,
                      color: statusColors[proj.status],
                      padding: "2px 8px",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      fontWeight: "500",
                      textTransform: "capitalize",
                    }}
                  >
                    {proj.status}
                  </span>
                </div>

                <div style={{ marginBottom: "0.3rem", fontSize: "0.85rem", color: "#555" }}>
                  {proj.progress}% complete
                </div>

                <div style={progressOuter}>
                  <div
                    style={{
                      ...progressInner,
                      width: `${proj.progress}%`,
                      background: "#0a0a23",
                      transition: "width 0.8s ease-in-out",
                    }}
                  ></div>
                </div>

                <div style={{ marginTop: "0.8rem" }}>
                  <p style={{ fontWeight: "bold", marginBottom: "0.4rem" }}>Milestones:</p>

                  {proj.milestones.length > 0 ? (
                    proj.milestones.map((m, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "0.85rem",
                          marginBottom: "0.3rem",
                        }}
                      >
                        <span
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: "#22c55e",
                            marginRight: "6px",
                          }}
                        ></span>
                        <span>
                          <strong>{m.name}</strong> - Due {m.due}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: "#777", fontSize: "0.85rem" }}>No milestones added.</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Feedback */}
      {activeTab === "Feedback" && (
        <div>
          <h4 style={{ marginBottom: "1rem", color: "#232323" }}>Feedback & Reviews</h4>
          {feedbackData.map((f, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                borderRadius: "8px",
                padding: "1rem 1.5rem",
                marginBottom: "1rem",
                boxShadow: "0 1px 5px rgba(0,0,0,0.05)",
                textAlign: "left",
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "1rem", marginBottom: "0.4rem" }}>
                {f.project}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.9rem",
                  color: "#555",
                  marginBottom: "0.5rem",
                }}
              >
                <span>👩‍🏫 {f.teacher}</span>
                <span>{f.date}</span>
              </div>
              <p style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>{f.comment}</p>
              <div>
                {Array.from({ length: f.rating }).map((_, i) => (
                  <span key={i} style={{ color: "#fbbf24", fontSize: "1rem" }}>★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div style={modalOverlay} onClick={() => setShowForm(false)}>
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            style={{
              background: "#ffffff",
              borderRadius: "14px",
              padding: "1.5rem 2rem",
              width: "95%",
              maxWidth: "620px",
              boxShadow: "0 6px 28px rgba(0,0,0,0.15)",
              color: "#232323",
              overflowY: "auto",
              maxHeight: "90vh",
            }}
          >
            <h3 style={{ color: "#232323", marginBottom: "1rem" }}>
              {editingProject ? "Edit Project" : "Add New Project"}
            </h3>

            <input
              placeholder="Project Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={inputStyle}
            />

            <input
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={inputStyle}
            />

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{
                ...inputStyle,
                height: "80px",
                resize: "none",
              }}
            />

            <div style={{ display: "flex", gap: "0.8rem", marginBottom: "1rem" }}>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                style={{ ...inputStyle, marginBottom: 0 }}
              />
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                style={{ ...inputStyle, marginBottom: 0 }}
              />
            </div>

            {/* Tags */}
            <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
              <input
                placeholder="Add technology (e.g., React)"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                style={inputStyle}
              />
              <button
                type="button"
                onClick={() => {
                  if (newTag) {
                    setFormData({ ...formData, tags: [...formData.tags, newTag] });
                    setNewTag("");
                  }
                }}
                style={addBtn}
              >
                +
              </button>
            </div>

            <div style={{ marginBottom: "0.8rem" }}>
              {formData.tags.map((tag, i) => (
                <span
                  key={i}
                  style={tagStyle}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      tags: formData.tags.filter((t) => t !== tag),
                    })
                  }
                >
                  {tag} ✕
                </span>
              ))}
            </div>

            <input
              placeholder="Project Repository URL"
              value={formData.repoURL}
              onChange={(e) => setFormData({ ...formData, repoURL: e.target.value })}
              style={inputStyle}
            />

            <input
              placeholder="Live Demo URL"
              value={formData.liveURL}
              onChange={(e) => setFormData({ ...formData, liveURL: e.target.value })}
              style={inputStyle}
            />

            <div style={{ display: "flex", gap: "0.4rem" }}>
              <input
                placeholder="Add image URL"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                style={inputStyle}
              />
              <button
                type="button"
                onClick={() => {
                  if (newImage) {
                    setFormData({ ...formData, image: newImage });
                    setNewImage("");
                  }
                }}
                style={addBtn}
              >
                ⬆
              </button>
            </div>

            {formData.image && (
              <img
                src={formData.image}
                alt="preview"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "1rem",
                  maxHeight: "250px",
                  objectFit: "cover",
                }}
              />
            )}

            <div style={{ display: "flex", gap: "1rem", marginTop: "0.8rem" }}>
              <button type="submit" style={submitBtn}>
                {editingProject ? "Update Project" : "Add Project"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingProject(null);
                }}
                style={cancelBtn}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// STYLES
const cardStyle = {
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  overflow: "hidden",
};
const imgStyle = { width: "100%", height: "200px", objectFit: "cover" };
const progressOuter = { width: "100%", height: "8px", background: "#e5e7eb", borderRadius: "8px" };
const progressInner = { height: "8px", borderRadius: "8px" };
const tagStyle = { background: "#f3f4f6", borderRadius: "6px", padding: "3px 8px", fontSize: "0.85rem" };
const editBtn = { background: "#0a0a23", color: "#fff", border: "none", borderRadius: "6px", padding: "6px 16px", cursor: "pointer" };
const addBtn = { background: "#232657", color: "#fff", border: "none", borderRadius: "8px", padding: "0 12px", cursor: "pointer", fontWeight: "bold" };
const submitBtn = { background: "#232657", color: "#fff", border: "none", borderRadius: "8px", padding: "0.8rem", width: "100%", fontWeight: "bold" };
const cancelBtn = { background: "#e5e7eb", border: "none", borderRadius: "8px", padding: "0.8rem", width: "100%", fontWeight: "bold", color: "#232323" };
const inputStyle = { width: "100%", padding: "0.9rem", borderRadius: "10px", border: "1px solid #d1d5db", marginBottom: "1rem" };
const modalOverlay = { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0, 0, 0, 0.3)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, overflowY: "auto", padding: "1rem" };

function StatBox({ label, value, icon }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "1rem 1.2rem",
        borderRadius: "10px",
        boxShadow: "0 1px 5px rgba(0,0,0,0.08)",
        minWidth: "150px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "0.9rem", color: "#666" }}>
        {label} {icon}
      </div>
      <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{value}</div>
    </div>
  );
}

function Tab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "0.6rem 1.5rem",
        background: active ? "#0a0a23" : "#fff",
        color: active ? "#fff" : "#232323",
        border: active ? "none" : "1px solid #ccc",
        borderRadius: "10px",
        fontWeight: active ? "bold" : "normal",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}
