import express from "express";
import User from "../models/User.js";

const router = express.Router();

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.json({ error: "User does not exist" });

  if (user.password !== password)
    return res.json({ error: "Incorrect password" });

  if (user.role !== role)
    return res.json({ error: "Role mismatch (selected wrong role)" });

  res.json(user);
});

// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  let user = await User.findOne({ email });
  if (user) return res.json({ error: "User already exists" });

  user = new User({ name, email, password, role });
  await user.save();

  res.json({ message: "Signup successful", user });
});

// GOOGLE LOGIN
router.post("/google-login", async (req, res) => {
  try {
    const { name, email, photo, role } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        password: "",
        role,
        photo,
      });
      await user.save();
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Google login failed" });
  }
});

export default router;
