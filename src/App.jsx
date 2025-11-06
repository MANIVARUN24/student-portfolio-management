import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RoleSwitcher from "./components/RoleSwitcher";
import StudentDashboard from "./components/StudentDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ProjectForm from "./components/ProjectForm";
import PortfolioView from "./components/PortfolioView";
import AdminReview from "./components/AdminReview";
import Login from "./components/Login";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // ✅ Shared project state (used by both Student & Admin)
  const [projects, setProjects] = useState([
    {
      title: "E-commerce Website",
      student: "Alex Johnson",
      category: "Web Development",
      description:
        "A full-stack e-commerce platform built with React and Node.js.",
      status: "pending-review",
      progress: 100,
      tags: ["React", "Node.js", "MongoDB"],
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      repoURL: "https://github.com/username/project",
      liveURL: "https://your-project.vercel.app",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
      milestones: 6,
    },
    {
      title: "Weather App",
      student: "Emma Davis",
      category: "UI/UX Design",
      description:
        "A responsive weather application with location-based forecasts.",
      status: "reviewed",
      progress: 90,
      tags: ["Vue.js", "OpenWeather API", "CSS Grid"],
      startDate: "2024-02-01",
      endDate: "2024-04-01",
      repoURL: "https://github.com/username/weatherapp",
      liveURL: "https://your-project.vercel.app",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      milestones: 5,
      rating: "5",
      feedback: "Excellent UI design and responsiveness.",
    },
    {
      title: "Task Management System",
      student: "Michael Chen",
      category: "Data Science",
      description:
        "A collaborative task management tool for small teams with analytics.",
      status: "needs-revision",
      progress: 60,
      tags: ["Angular", "Firebase", "Material Design"],
      startDate: "2024-03-01",
      endDate: "2024-05-01",
      repoURL: "https://github.com/username/taskmanager",
      liveURL: "https://your-project.vercel.app",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      milestones: 4,
      rating: "3",
      feedback: "Needs better backend integration and validation.",
    },
  ]);

  // 🟩 Add new project (student)
  const addProject = (proj) => setProjects([...projects, proj]);

  // 🟨 Update an existing project
  const updateProject = (updatedProj) => {
    const updated = projects.map((proj) =>
      proj.title === updatedProj.title ? updatedProj : proj
    );
    setProjects(updated);
  };

  // 🟦 Admin gives feedback
  const provideFeedback = (index, feedback, rating, status) => {
    const updated = [...projects];
    updated[index].feedback = feedback;
    updated[index].rating = rating;
    updated[index].status = status;
    setProjects(updated);
  };

  // 🟧 Handle login (student/admin)
  const handleLogin = ({ role }) => {
    setIsAdmin(role === "admin");
    setLoggedIn(true);
  };

  // 🟥 Handle logout
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) setLoggedIn(false);
  };

  // ⛔ Show login first
  if (!loggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // ✅ Router setup
  return (
    <Router>
      <Navbar isAdmin={isAdmin} onLogout={handleLogout} />

      <div style={{ background: "#f7f8fa", minHeight: "100vh", padding: "2rem" }}>
        {/* Optional role switcher */}
        {/* <RoleSwitcher isAdmin={isAdmin} setIsAdmin={setIsAdmin} /> */}

        <Routes>
          {/* Home route switches between Admin & Student view */}
          <Route
            path="/"
            element={
              isAdmin ? (
                <AdminDashboard
                  allProjects={projects}               // ✅ fixed prop name
                  provideFeedback={provideFeedback}   // ✅ passes back to App
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
