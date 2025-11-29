import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  startDate: String,
  endDate: String,
  tags: [String],
  repoURL: String,
  liveURL: String,
  image: String,
  progress: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: "in-progress"
  },
  milestones: Array
});

export default mongoose.model("Project", projectSchema);
