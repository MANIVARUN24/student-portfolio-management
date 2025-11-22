import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

/* ============================
   GET all projects
============================ */
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================
   GET single project (optional)
============================ */
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================
   POST new project (Student Add)
============================ */
router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================
   PUT update project (Admin Review)
============================ */
router.put("/:id", async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated document
    );

    if (!updatedProject)
      return res.status(404).json({ error: "Project not found" });

    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
