const Project = require("../models/Project");

// Get all projects
exports.getProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

// Add project
exports.addProject = async (req, res) => {
  const newProject = new Project(req.body);
  await newProject.save();
  res.json({ message: "Project Created", newProject });
};

// Update project (status, description etc)
exports.updateProject = async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// Delete project
exports.deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
};
