import React from 'react';

const Navbar = ({ isAdmin }) => (
  <nav style={{ padding: '1rem', background: '#0a0a23', color: '#fff' }}>
    <span>Student Portfolio Platform</span>
    <span style={{ float: 'right' }}>{isAdmin ? 'Admin/Teacher' : 'Student'}</span>
  </nav>
);

export default Navbar;