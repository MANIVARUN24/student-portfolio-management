import express from "express";
import User from "../models/User.js";

const router = express.Router();

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email, role });
    if (!user) return res.json({ error: "User does not exist for this role" });

    // NOTE: plain text password check (upgrade to bcrypt in production)
    if (user.password !== password) return res.json({ error: "Incorrect password" });

    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      photo: user.photo || null
    };

    res.json(safeUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email, role });
    if (exists) return res.json({ error: "Account already exists for this role" });

    const user = new User({ name, email, password, role });
    await user.save();

    res.json({ message: "Signup successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
});

// GOOGLE LOGIN (via frontend Firebase)
router.post("/google-login", async (req, res) => {
  try {
    const { name, email, photo, role } = req.body;
    let user = await User.findOne({ email, role });

    if (!user) {
      user = new User({ name, email, photo, role, password: "" });
      await user.save();
    }

    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      photo: user.photo || null,
    };

    res.json(safeUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Google login failed" });
  }
});

export default router;
