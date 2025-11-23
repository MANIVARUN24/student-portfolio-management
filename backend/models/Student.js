import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  institution: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Student", studentSchema);
