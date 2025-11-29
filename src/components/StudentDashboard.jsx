import React, { useState } from "react";

const statusColors = {
  completed: "#22c55e",
  "in-progress": "#3b82f6",
  planning: "#facc15",
};

export default function StudentDashboard({ projects, addProject, updateProject }) {
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [activeTab, setActiveTab] = useState("My Projects");

  const emptyForm = {
    _id: null,
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
    status: "in-progress",
    milestones: []
  };

  const [formData, setFormData] = useState(emptyForm);
  const [newTag, setNewTag] = useState("");
  const [newImage, setNewImage] = useState("");

  const openEdit = (proj) => {
    setEditingProject(proj);
    setFormData({
      _id: proj._id,
      title: proj.title || "",
      category: proj.category || "",
      description: proj.description || "",
      startDate: proj.startDate || "",
      endDate: proj.endDate || "",
      tags: proj.tags || [],
      repoURL: proj.repoURL || "",
      liveURL: proj.liveURL || "",
      image: proj.image || "",
      progress: proj.progress || 0,
      status: proj.status || "in-progress",
      milestones: proj.milestones || [],
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingProject) updateProject(formData);
    else addProject(formData);

    setShowForm(false);
    setEditingProject(null);
    setFormData(emptyForm);
  };

  const totalProjects = projects.length;
  const completed = projects.filter((p) => p.status === "completed").length;
  const inProgress = projects.filter((p) => p.status === "in-progress").length;

  return (
    <div style={{ background: "#f7f8fa", minHeight: "100vh", padding: "2rem" }}>

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ fontWeight: "bold" }}>Welcome back 👋</h2>
          <p style={{ color: "#555" }}>Manage your projects and portfolio</p>
        </div>

        {activeTab === "My Projects" && (
          <button
            onClick={() => {
              setEditingProject(null);
              setFormData(emptyForm);
              setShowForm(true);
            }}
            style={{
              background: "#0a0a23",
              color: "#fff",
              border: "none",
              padding: "0.7rem 1.5rem",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            + Add Project
          </button>
        )}
      </div>

      {/* STATS */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <Stat label="Total Projects" value={totalProjects} />
        <Stat label="Completed" value={completed} />
        <Stat label="In Progress" value={inProgress} />
      </div>

      {/* TABS */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
        {["My Projects", "Portfolio View", "Progress Tracking"].map((tab) => (
          <Tab key={tab} label={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)} />
        ))}
      </div>

      {/* ===================== MY PROJECTS TAB ===================== */}
      {activeTab === "My Projects" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(350px,1fr))", gap: "1.5rem" }}>
          {projects.map((p, idx) => (
            <div
              key={idx}
              style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", overflow: "hidden" }}
            >
              <img src={p.image} alt="" style={{ width: "100%", height: 200, objectFit: "cover" }} />
              <div style={{ padding: "1rem" }}>
                <h3 style={{ fontWeight: 600 }}>{p.title}</h3>
                <p style={{ color: "#666", fontSize: "0.9rem" }}>{p.description}</p>

                <div style={{ background: "#eee", height: "8px", borderRadius: "8px", marginTop: "10px" }}>
                  <div
                    style={{
                      width: `${p.progress}%`,
                      height: "8px",
                      background: statusColors[p.status],
                      borderRadius: "8px",
                    }}
                  ></div>
                </div>

                <button
                  onClick={() => openEdit(p)}
                  style={{
                    marginTop: "1rem",
                    background: "#0a0a23",
                    color: "#fff",
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===================== PORTFOLIO VIEW ===================== */}
      {activeTab === "Portfolio View" && (
        <div>
          <h3>Your Portfolio</h3>
          {projects.map((p) => (
            <div key={p._id} style={{ background: "#fff", padding: "1rem", borderRadius: "10px", marginBottom: "1rem" }}>
              <h3>{p.title}</h3>
              <img src={p.image} style={{ width: "100%", maxHeight: 300, objectFit: "cover" }} />
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* ===================== PROGRESS TRACKING ===================== */}
      {activeTab === "Progress Tracking" && (
        <div>
          <h3>Your Project Progress</h3>

          {projects.map((p, idx) => (
            <div key={idx} style={{ background: "#fff", padding: 20, marginBottom: 20, borderRadius: 10 }}>
              <h3>{p.title}</h3>

              <div style={{ width: "100%", background: "#eee", height: 10, borderRadius: 6 }}>
                <div
                  style={{
                    width: `${p.progress}%`,
                    height: 10,
                    background: "#0a0a23",
                    borderRadius: 6,
                  }}
                ></div>
              </div>

              <p style={{ marginTop: 10 }}>{p.progress}% completed</p>
            </div>
          ))}
        </div>
      )}

      {/* ===================== ADD/EDIT MODAL ===================== */}
      {showForm && (
        <Modal
          formData={formData}
          setFormData={setFormData}
          setShowForm={setShowForm}
          handleSubmit={handleSubmit}
          newTag={newTag}
          setNewTag={setNewTag}
          newImage={newImage}
          setNewImage={setNewImage}
          editingProject={editingProject}
        />
      )}
    </div>
  );
}

/* ---------------------- COMPONENTS ---------------------- */

function Stat({ label, value }) {
  return (
    <div style={{ background: "#fff", padding: "1rem", borderRadius: "10px", flex: 1 }}>
      <div style={{ color: "#666" }}>{label}</div>
      <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>{value}</div>
    </div>
  );
}

function Tab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "0.7rem 1.5rem",
        borderRadius: "10px",
        border: active ? "none" : "1px solid #ccc",
        background: active ? "#0a0a23" : "#fff",
        color: active ? "#fff" : "#333",
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      {label}
    </button>
  );
}

/* ---------------------- MODAL COMPONENT ---------------------- */

function Modal({
  formData,
  setFormData,
  handleSubmit,
  setShowForm,
  newTag,
  setNewTag,
  newImage,
  setNewImage,
  editingProject,
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={() => setShowForm(false)}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "900px",
          background: "white",
          padding: "2rem",
          borderRadius: "15px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{editingProject ? "Edit Project" : "Add New Project"}</h2>

        <input
          placeholder="Project Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          style={modalInput}
        />

        <input
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          style={modalInput}
        />

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          style={{ ...modalInput, height: "120px", resize: "none" }}
        />

        <div style={{ display: "flex", gap: "1rem" }}>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            style={{ ...modalInput, flex: 1 }}
          />

          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            style={{ ...modalInput, flex: 1 }}
          />
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            placeholder="Add technology (React, Node, etc.)"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            style={{ ...modalInput, flex: 1 }}
          />
          <button
            type="button"
            onClick={() => {
              if (newTag.trim() !== "") {
                setFormData({ ...formData, tags: [...formData.tags, newTag] });
                setNewTag("");
              }
            }}
            style={addButton}
          >
            +
          </button>
        </div>

        {/* TAG DISPLAY */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          {formData.tags.map((tag, index) => (
            <span
              key={index}
              style={{
                background: "#e5e7eb",
                padding: "6px 10px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={() =>
                setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) })
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
          style={modalInput}
        />

        <input
          placeholder="Live Demo URL"
          value={formData.liveURL}
          onChange={(e) => setFormData({ ...formData, liveURL: e.target.value })}
          style={modalInput}
        />

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            placeholder="Add image URL"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            style={{ ...modalInput, flex: 1 }}
          />
          <button
            type="button"
            onClick={() => {
              if (newImage.trim() !== "") {
                setFormData({ ...formData, image: newImage });
                setNewImage("");
              }
            }}
            style={addButton}
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
              height: "250px",
              objectFit: "cover",
              borderRadius: "10px",
              marginTop: "1rem",
            }}
          />
        )}

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button onClick={handleSubmit} style={saveButton}>
            {editingProject ? "Update Project" : "Add Project"}
          </button>
          <button onClick={() => setShowForm(false)} style={cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------- STYLES ---------------------- */

const modalInput = {
  width: "100%",
  padding: "0.9rem",
  marginTop: "1rem",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
};

const addButton = {
  background: "#0a0a23",
  color: "#fff",
  padding: "0.9rem",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
};

const saveButton = {
  flex: 1,
  padding: "1rem",
  background: "#0a0a23",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

const cancelButton = {
  flex: 1,
  padding: "1rem",
  background: "#e5e7eb",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  color: "#333",
};

