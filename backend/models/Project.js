import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  student: { type: String, required: true },
  category: String,
  description: String,
  status: { type: String, default: "pending-review" },
  progress: Number,
  tags: [String],
  startDate: String,
  endDate: String,
  repoURL: String,
  liveURL: String,
  image: String,
  milestones: Number,
  rating: String,
  feedback: String
});

// VERY IMPORTANT — DEFAULT EXPORT ❗❗
export default mongoose.model("Project", ProjectSchema);

