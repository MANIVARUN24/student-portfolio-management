import express from "express";
import User from "../models/User.js";   // THIS NOW WORKS

const router = express.Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { role, email, password, institution } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email & password required" });
    }

    let user = await User.findOne({ email });

    // Auto-register new user
    if (!user) {
      user = new User({ role, email, password, institution });
      await user.save();
    }

    return res.json({
      message: "Login successful",
      user,
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
