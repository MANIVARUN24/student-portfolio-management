import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import StudentDashboard from "./components/StudentDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ProjectForm from "./components/ProjectForm";
import PortfolioView from "./components/PortfolioView";
import AdminReview from "./components/AdminReview";
import Login from "./components/Login";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API}/api/projects`);
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.log("❌ Error fetching:", error);
      }
    };
    fetchProjects();
  }, []);

  const addProject = async (proj) => {
    try {
      const res = await fetch(`${API}/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(proj),
      });
      const saved = await res.json();
      setProjects((prev) => [saved, ...prev]);
    } catch (err) {
      console.error("Add project error", err);
    }
  };

  const updateProject = async (updatedProj) => {
    try {
      const res = await fetch(`${API}/api/projects/${updatedProj._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProj),
      });
      const saved = await res.json();
      setProjects((prev) => prev.map((p) => (p._id === saved._id ? saved : p)));
    } catch (err) {
      console.error("Update project error", err);
    }
  };

  const provideFeedback = async (index, feedback, rating, status) => {
    try {
      const project = projects[index];
      const res = await fetch(`${API}/api/projects/${project._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...project, feedback, rating, status }),
      });
      const updated = await res.json();
      setProjects((prev) => prev.map((p, i) => (i === index ? updated : p)));
    } catch (err) {
      console.error("Feedback error", err);
    }
  };

  const handleLogin = (data) => {
    setIsAdmin(data.role === "admin");
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setIsAdmin(false);
  };

  if (!loggedIn) return <Login onLogin={handleLogin} />;

  return (
    <Router>
      <Navbar isAdmin={isAdmin} onLogout={handleLogout} />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route
            path="/"
            element={
              isAdmin ? (
                <AdminDashboard allProjects={projects} provideFeedback={provideFeedback} />
              ) : (
                <StudentDashboard projects={projects} addProject={addProject} updateProject={updateProject} />
              )
            }
          />
          <Route path="/upload" element={<ProjectForm addProject={addProject} />} />
          <Route path="/portfolio" element={<PortfolioView projects={projects} />} />
          {isAdmin && <Route path="/review" element={<AdminReview projects={projects} provideFeedback={provideFeedback} />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
