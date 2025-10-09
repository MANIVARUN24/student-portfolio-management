import React from 'react';

const PortfolioView = ({ projects }) => (
  <div style={{ padding: '1rem' }}>
    <h3>Portfolio</h3>
    <ul>
      {projects.map((proj, idx) => (
        <li key={idx}>
          <strong>{proj.title}</strong>: {proj.description}
        </li>
      ))}
    </ul>
  </div>
);

export default PortfolioView;