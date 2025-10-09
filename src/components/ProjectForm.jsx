import React, { useState } from 'react';

const ProjectForm = ({ addProject }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(0);
  const [tags, setTags] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    addProject({
      title,
      category,
      description,
      status: progress === 100 ? 'completed' : progress >= 75 ? 'in progress' : 'planning',
      progress: Number(progress),
      tags: tags.split(',').map(t => t.trim()),
      date,
      image
    });
    setTitle('');
    setCategory('');
    setDescription('');
    setProgress(0);
    setTags('');
    setDate('');
    setImage('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '2rem', borderRadius: '16px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', maxWidth: '500px', margin: '2rem auto' }}>
      <h3 style={{ marginBottom: '1rem' }}>Add New Project</h3>
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Category (e.g. Web Development)"
        value={category}
        onChange={e => setCategory(e.target.value)}
        required
        style={inputStyle}
      />
      <textarea
        placeholder="Project Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        style={{ ...inputStyle, height: '80px' }}
      />
      <input
        type="number"
        placeholder="Progress (%)"
        value={progress}
        onChange={e => setProgress(e.target.value)}
        min={0}
        max={100}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={e => setTags(e.target.value)}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Date (e.g. Jan 15, 2024 - Mar 15, 2024)"
        value={date}
        onChange={e => setDate(e.target.value)}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={e => setImage(e.target.value)}
        style={inputStyle}
      />
      <button type="submit" style={{ ...inputStyle, background: '#2d6cdf', color: '#fff', fontWeight: 'bold', cursor: 'pointer', border: 'none', borderRadius: '8px' }}>Add Project</button>
    </form>
  );
};

const inputStyle = {
  width: '100%',
  padding: '0.7rem',
  marginBottom: '1rem',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
  background: '#f3f4f6',
  color: '#333',
  fontSize: '1rem'
};

export default ProjectForm;