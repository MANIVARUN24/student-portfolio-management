import React from 'react';

const RoleSwitcher = ({ isAdmin, setIsAdmin }) => (
  <div style={{ margin: '1rem' }}>
    <button onClick={() => setIsAdmin(false)} disabled={!isAdmin}>Student</button>
    <button onClick={() => setIsAdmin(true)} disabled={isAdmin}>Admin/Teacher</button>
  </div>
);

export default RoleSwitcher;