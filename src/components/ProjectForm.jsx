import React, { useState } from "react";

export default function ProjectForm({ addProject }) {
  const [form, setForm] = useState({ title: "", description: "", image: "" });

  const submit = (e) => {
    e.preventDefault();
    addProject(form);
    setForm({ title: "", description: "", image: "" });
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 680, margin: "0 auto" }}>
      <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
      <button type="submit">Upload</button>
    </form>
  );
}
