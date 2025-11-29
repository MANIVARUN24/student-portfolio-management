import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RoleSwitcher from "./components/RoleSwitcher";
import StudentDashboard from "./components/StudentDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ProjectForm from "./components/ProjectForm";
import PortfolioView from "./components/PortfolioView";
import AdminReview from "./components/AdminReview";
import Login from "./components/Login"; // Make sure file is Login.jsx

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("❌ Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);
  const addProject = async (proj) => {
    try {
      const res = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(proj),
      });

      const savedProject = await res.json();
      setProjects((prev) => [...prev, savedProject]);
    } catch (error) {
      console.error("❌ Error adding project:", error);
    }
  };

  // 🟨 Update existing project locally
  const updateProject = (updatedProj) => {
    setProjects((prev) =>
      prev.map((proj) => (proj._id === updatedProj._id ? updatedProj : proj))
    );
  };

  // 🟦 Admin gives feedback (updates backend)
  const provideFeedback = async (index, feedback, rating, status) => {
    try {
      const project = projects[index];

      const res = await fetch(
        `http://localhost:5000/api/projects/${project._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ feedback, rating, status }),
        }
      );

      const updated = await res.json();

      setProjects((prev) =>
        prev.map((p, i) => (i === index ? updated : p))
      );
    } catch (error) {
      console.error("❌ Error updating project:", error);
    }
  };

  // 🟧 Handle login
  const handleLogin = ({ role }) => {
    setIsAdmin(role === "admin");
    setLoggedIn(true);
  };

  // 🟥 Handle logout
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      setLoggedIn(false);
    }
  };

  // ⛔ Show login page first
  if (!loggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Navbar isAdmin={isAdmin} onLogout={handleLogout} />

      <div style={{ background: "#f7f8fa", minHeight: "100vh", padding: "2rem" }}>
        <Routes>
          <Route
            path="/"
            element={
              isAdmin ? (
                <AdminDashboard
                  allProjects={projects}
                  provideFeedback={provideFeedback}
                />
              ) : (
                <StudentDashboard
                  projects={projects}
                  addProject={addProject}
                  updateProject={updateProject}
                />
              )
            }
          />

          {/* Student routes */}
          <Route path="/upload" element={<ProjectForm addProject={addProject} />} />
          <Route path="/portfolio" element={<PortfolioView projects={projects} />} />

          {/* Admin routes */}
          {isAdmin && (
            <Route
              path="/review"
              element={
                <AdminReview
                  projects={projects}
                  provideFeedback={provideFeedback}
                />
              }
            />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
