import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('');

  const handleRoleChange = (r) => setRole(r);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ role, email, password, institution });
  };

  // Dynamic theme colors
  const isAdmin = role === 'admin';
  const theme = {
    background: isAdmin ? '#e8edf7' : '#f7f8fa',
    cardBg: '#ffffff',
    titleColor: isAdmin ? '#1e3a8a' : '#111827',
    buttonBg: isAdmin ? '#1e3a8a' : '#0a0a23',
    buttonHover: isAdmin ? '#273ea1' : '#1a1a40',
  };

  // Predefined institutions
  const institutions = [
    'NIT Warangal',
    'IIT Hyderabad',
    'JNTU Hyderabad',
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.background,
        zIndex: 9999,
        transition: 'background 0.3s ease-in-out',
      }}
    >
      <div
        style={{
          background: theme.cardBg,
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
          minWidth: '350px',
          maxWidth: '90vw',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '0.5rem',
            color: theme.titleColor,
          }}
        >
          {isAdmin ? 'Teacher/Admin Portal' : 'Student Portfolio Platform'}
        </h2>
        <p
          style={{
            textAlign: 'center',
            color: '#6b7280',
            marginBottom: '1.5rem',
          }}
        >
          {isAdmin
            ? 'Sign in to review, manage, and assess student projects'
            : 'Sign in to manage your projects and portfolios'}
        </p>

        {/* Role Switch */}
        <div
          style={{
            display: 'flex',
            marginBottom: '1rem',
            background: '#f3f4f6',
            borderRadius: '999px',
            overflow: 'hidden',
          }}
        >
          <button
            type="button"
            style={{
              flex: 1,
              padding: '0.5rem 0',
              background: role === 'student' ? '#fff' : 'transparent',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              color: role === 'student' ? '#111827' : '#6b7280',
              transition: 'all 0.2s',
            }}
            onClick={() => handleRoleChange('student')}
          >
            Student
          </button>
          <button
            type="button"
            style={{
              flex: 1,
              padding: '0.5rem 0',
              background: role === 'admin' ? '#fff' : 'transparent',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              color: role === 'admin' ? '#111827' : '#6b7280',
              transition: 'all 0.2s',
            }}
            onClick={() => handleRoleChange('admin')}
          >
            Admin/Teacher
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <label
            style={{
              display: 'block',
              marginBottom: '0.25rem',
              color: '#374151',
            }}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={
              isAdmin
                ? 'teacher.admin@school.edu'
                : 'student.name@college.edu'
            }
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: isAdmin ? '1rem' : '1.25rem',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              backgroundColor: '#ffffff',
              color: '#111827',
              fontSize: '0.95rem',
            }}
          />

          {/* Institution Dropdown (Only for Teachers/Admins) */}
          {isAdmin && (
            <>
              <label
                style={{
                  display: 'block',
                  marginBottom: '0.25rem',
                  color: '#374151',
                }}
              >
                Select Institution
              </label>
              <select
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  marginBottom: '1.25rem',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  backgroundColor: '#ffffff',
                  color: institution ? '#111827' : '#6b7280',
                  fontSize: '0.95rem',
                }}
              >
                <option value="" disabled>
                  Choose your institution
                </option>
                {institutions.map((inst) => (
                  <option key={inst} value={inst}>
                    {inst}
                  </option>
                ))}
              </select>
            </>
          )}

          <label
            style={{
              display: 'block',
              marginBottom: '0.25rem',
              color: '#374151',
            }}
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              backgroundColor: '#ffffff',
              color: '#111827',
              fontSize: '0.95rem',
            }}
          />

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: theme.buttonBg,
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background 0.3s',
            }}
            onMouseOver={(e) =>
              (e.target.style.background = theme.buttonHover)
            }
            onMouseOut={(e) =>
              (e.target.style.background = theme.buttonBg)
            }
          >
            Sign in as {isAdmin ? 'Teacher/Admin' : 'Student'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
