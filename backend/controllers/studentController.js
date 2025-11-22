const Project = require("../models/Project");

exports.getStudents = async (req, res) => {
  const projects = await Project.find();
  const students = {};

  // Build student stats
  projects.forEach((p) => {
    if (!students[p.student]) {
      students[p.student] = {
        name: p.student,
        totalProjects: 0,
        completed: 0,
        ratingSum: 0,
        ratingsCount: 0,
        lastActive: p.endDate
      };
    }

    const s = students[p.student];
    s.totalProjects++;
    if (p.status === "reviewed") s.completed++;
    if (p.rating) {
      s.ratingSum += Number(p.rating);
      s.ratingsCount++;
    }
  });

  const final = Object.values(students).map((s) => ({
    name: s.name,
    totalProjects: s.totalProjects,
    completed: s.completed,
    avgRating: s.ratingsCount ? (s.ratingSum / s.ratingsCount).toFixed(1) : "N/A",
    lastActive: s.lastActive
  }));

  res.json(final);
};

// Get student profile with projects
exports.getStudentProfile = async (req, res) => {
  const studentName = req.params.name;
  const projects = await Project.find({ student: studentName });
  res.json(projects);
};
