import React from 'react';

const submissions = [
  {
    title: 'E-commerce Website',
    author: 'Alex Johnson',
    description: 'A full-stack e-commerce platform built with React and Node.js',
    status: 'pending-review',
    tags: ['React', 'Node.js', 'MongoDB'],
    date: '2024-03-15',
    rating: null,
  },
  {
    title: 'Weather App',
    author: 'Emma Davis',
    description: 'A responsive weather application using OpenWeather API',
    status: 'reviewed',
    tags: ['Vue.js', 'OpenWeather API', 'CSS Grid'],
    date: '2024-03-14',
    rating: 5,
  },
  {
    title: 'Task Management System',
    author: 'Michael Chen',
    description: 'A collaborative task management tool for teams',
    status: 'needs-revision',
    tags: ['Angular', 'Firebase', 'Material Design'],
    date: '2024-03-13',
    rating: 3,
  }
];

const AdminDashboard = () => {
  const totalStudents = 3;
  const totalSubmissions = submissions.length;
  const pendingReviews = submissions.filter(s => s.status === 'pending-review').length;
  const avgRating = (
    submissions
      .filter(s => s.rating !== null)
      .reduce((sum, s) => sum + s.rating, 0) / submissions.filter(s => s.rating !== null).length
  ).toFixed(1);

  return (
    <div style={{ background: '#f7f8fa', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ marginBottom: '1rem', fontWeight: 'bold', fontSize: '1.1rem' }}>
        Admin Dashboard
        <div style={{ fontWeight: 'normal', fontSize: '0.95rem', color: '#666' }}>
          Welcome, Prof. Sarah Wilson
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard label="Total Students" value={totalStudents} />
        <StatCard label="Total Submissions" value={totalSubmissions} />
        <StatCard label="Pending Reviews" value={pendingReviews} />
        <StatCard label="Avg Rating" value={avgRating} />
      </div>

      <Tabs />

      <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>Project Submissions</div>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '1rem' }}>
        {submissions.map((sub, idx) => (
          <SubmissionCard key={idx} submission={sub} />
        ))}
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div style={{
    background: '#fff',
    borderRadius: '12px',
    padding: '1rem 2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    minWidth: '140px',
    textAlign: 'center',
    fontWeight: 'bold',
    border: '1px solid #eee'
  }}>
    {label}<br /><span style={{ fontSize: '1.5rem', color: '#222' }}>{value}</span>
  </div>
);

const Tabs = () => (
  <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
    {['Project Submissions', 'Student Management', 'Analytics'].map((tab, i) => (
      <button
        key={tab}
        style={{
          background: i === 0 ? '#fff' : '#f3f4f6',
          border: 'none',
          borderRadius: '8px',
          padding: '0.5rem 1.5rem',
          fontWeight: i === 0 ? 'bold' : 'normal',
          cursor: 'pointer',
          boxShadow: i === 0 ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
          color: '#222'
        }}
      >
        {tab}
      </button>
    ))}
  </div>
);

const SubmissionCard = ({ submission }) => (
  <div style={{
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
    padding: '1rem',
    width: '400px',
    marginBottom: '2rem',
    border: '1px solid #eee'
  }}>
    <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{submission.title}</div>
    <div style={{ color: '#666', fontSize: '0.9rem' }}>by {submission.author}</div>
    <div style={{ color: '#555', margin: '0.5rem 0' }}>{submission.description}</div>

    <div style={{ marginBottom: '0.5rem' }}>
      {submission.tags.map((tag, i) => (
        <span key={i} style={{
          background: '#f3f4f6',
          borderRadius: '6px',
          padding: '0.2rem 0.7rem',
          marginRight: '0.5rem',
          fontSize: '0.85rem'
        }}>{tag}</span>
      ))}
    </div>

    <div style={{ fontSize: '0.8rem', color: '#888' }}>{submission.date}</div>

    <div style={{ fontSize: '0.85rem', margin: '0.5rem 0' }}>
      <span style={{
        background: statusColor[submission.status],
        color: '#fff',
        borderRadius: '8px',
        padding: '0.2rem 0.7rem'
      }}>{submission.status}</span>
    </div>

    {submission.rating && (
      <div style={{ fontSize: '0.9rem', color: '#ffaa00' }}>⭐ {submission.rating}/5</div>
    )}
  </div>
);

const statusColor = {
  'reviewed': '#4caf50',
  'pending-review': '#f9a825',
  'needs-revision': '#f44336'
};

export default AdminDashboard;
