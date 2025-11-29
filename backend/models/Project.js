import mongoose from "mongoose";

const MilestoneSchema = new mongoose.Schema({
  name: String,
  due: String,
  done: { type: Boolean, default: false },
});

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: String,
    description: String,
    startDate: String,
    endDate: String,
    tags: [String],
    repoURL: String,
    liveURL: String,
    image: String,
    progress: { type: Number, default: 0 },
    status: { type: String, enum: ["planning", "in-progress", "completed"], default: "in-progress" },
    milestones: [MilestoneSchema],
    feedback: String,
    rating: { type: Number, default: 0 },
    ownerEmail: String, // optional owner identifier
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);
export default Project;
