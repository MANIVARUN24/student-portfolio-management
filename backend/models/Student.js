import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  rollNumber: String
}, { timestamps: true });

export default mongoose.model("Student", StudentSchema);
