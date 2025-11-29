import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, default: "" }, // plain for now (you can bcrypt later)
    role: { type: String, enum: ["student", "admin"], default: "student" },
    photo: { type: String, default: "" }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
