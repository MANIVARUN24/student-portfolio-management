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

  // Local sample projects used instead of backend
  const [projects, setProjects] = useState([
    {
      _id: "1",
      title: "E-commerce Website",
      category: "Web Development",
      description: "A full-stack e-commerce platform built with React and Node.js",
      status: "completed",
      progress: 100,
      tags: ["React", "Node.js", "MongoDB"],
      date: "Jan 15, 2024 - Mar 15, 2024",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
      milestones: 6,
    },
    {
      _id: "2",
      title: "Mobile App UI Design",
      category: "UI/UX Design",
      description: "User interface design for a fitness tracking mobile application",
      status: "in progress",
      progress: 75,
      tags: ["Figma", "Adobe XD", "Principle"],
      date: "Feb 1, 2024 - Apr 1, 2024",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      milestones: 5,
    },
    {
      _id: "3",
      title: "Data Analysis Project",
      category: "Data Science",
      description: "Statistical analysis of customer behavior using Python and pandas",
      status: "planning",
      progress: 25,
      tags: ["Python", "Pandas", "Matplotlib"],
      date: "Mar 1, 2024 - May 1, 2024",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      milestones: 4,
    },
  ]);

  // Add project locally
  const addProject = (proj) => {
    const newProj = { ...proj, _id: Date.now().toString() };
    setProjects((prev) => [...prev, newProj]);
  };

  // Update existing project locally
  const updateProject = (updatedProj) => {
    setProjects((prev) =>
      prev.map((proj) => (proj._id === updatedProj._id ? updatedProj : proj))
    );
  };

  // Provide feedback locally
  const provideFeedback = (index, feedback, rating, status) => {
    setProjects((prev) =>
      prev.map((p, i) =>
        i === index
          ? { ...p, feedback: feedback || p.feedback, rating: rating || p.rating, status: status || p.status }
          : p
      )
    );
  };

  // Handle login
  const handleLogin = ({ role }) => {
    setIsAdmin(role === "admin");
    setLoggedIn(true);
  };

  // Handle logout
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      setLoggedIn(false);
    }
  };

  // Show login page first
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
                <AdminDashboard allProjects={projects} provideFeedback={provideFeedback} />
              ) : (
                <StudentDashboard projects={projects} addProject={addProject} updateProject={updateProject} />
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
              element={<AdminReview projects={projects} provideFeedback={provideFeedback} />}
            />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
