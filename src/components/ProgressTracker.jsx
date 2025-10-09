import React from 'react';

export default function ProgressTracker({ milestones }) {
  return (
    <ul>
      {milestones.map((ms, idx) => (
        <li key={idx}>
          <span>{ms.name}</span> - {ms.completed ? "Done" : "Pending"}
        </li>
      ))}
    </ul>
  );
}
