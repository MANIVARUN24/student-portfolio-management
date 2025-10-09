import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RoleSwitcher from './components/RoleSwitcher';
import Dashboard from './components/Dashboard';
import ProjectForm from './components/ProjectForm';
import PortfolioView from './components/PortfolioView';
import AdminReview from './components/AdminReview';
import Login from './components/Login';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [projects, setProjects] = useState([
    {
      title: 'E-commerce Website',
      category: 'Web Development',
      description: 'A full-stack e-commerce platform built with React and Node.js',
      status: 'completed',
      progress: 100,
      tags: ['React', 'Node.js', 'MongoDB'],
      date: 'Jan 15, 2024 - Mar 15, 2024',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
      milestones: 6
    },
    {
      title: 'Mobile App UI Design',
      category: 'UI/UX Design',
      description: 'User interface design for a fitness tracking mobile application',
      status: 'in progress',
      progress: 75,
      tags: ['Figma', 'Adobe XD', 'Principle'],
      date: 'Feb 1, 2024 - Apr 1, 2024',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
      milestones: 5
    },
    {
      title: 'Data Analysis Project',
      category: 'Data Science',
      description: 'Statistical analysis of customer behavior using Python and pandas',
      status: 'planning',
      progress: 25,
      tags: ['Python', 'Pandas', 'Matplotlib'],
      date: 'Mar 1, 2024 - May 1, 2024',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      milestones: 4
    }
  ]);
  const [loggedIn, setLoggedIn] = useState(false);

  // Add project (used by ProjectForm)
  const addProject = (proj) => setProjects([...projects, proj]);

  // Feedback for admin (used by AdminReview)
  const provideFeedback = (idx, fb) => {
    const updated = [...projects];
    updated[idx].feedback = fb;
    setProjects(updated);
  };

  // Handle login
  const handleLogin = ({ role }) => {
    setIsAdmin(role === 'admin');
    setLoggedIn(true);
  };

  // Show login screen first
  if (!loggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Navbar isAdmin={isAdmin} />
      <div style={{ background: '#f7f8fa', minHeight: '100vh', padding: '2rem' }}>
        <RoleSwitcher isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        <Routes>
          <Route
            path="/"
            element={<Dashboard projects={projects} isAdmin={isAdmin} />}
          />
          <Route
            path="/upload"
            element={<ProjectForm addProject={addProject} />}
          />
          <Route
            path="/portfolio"
            element={<PortfolioView projects={projects} />}
          />
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