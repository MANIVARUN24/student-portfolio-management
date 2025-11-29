import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  name: String,
  email: String
}, { timestamps: true });

export default mongoose.model("Admin", AdminSchema);
