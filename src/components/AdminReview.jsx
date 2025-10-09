import React, { useState } from 'react';

const AdminReview = ({ projects, provideFeedback }) => {
  const [feedback, setFeedback] = useState('');

  return (
    <div style={{ padding: '1rem' }}>
      <h3>Review Projects</h3>
      {projects.map((proj, idx) => (
        <div key={idx} style={{ marginBottom: '1rem' }}>
          <strong>{proj.title}</strong>: {proj.description}
          <br />
          <input
            type="text"
            placeholder="Feedback"
            value={proj.feedback || ''}
            onChange={e => setFeedback(e.target.value)}
          />
          <button onClick={() => provideFeedback(idx, feedback)}>Submit Feedback</button>
        </div>
      ))}
    </div>
  );
};

export default AdminReview;