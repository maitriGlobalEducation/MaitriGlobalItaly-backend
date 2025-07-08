import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import FormSubmission from "../models/FormSubmission.js";

const router = express.Router();

// GET /api/dashboard
router.get("/", authMiddleware, async (req, res) => {
  try {
    const submissions = await FormSubmission.find().sort({ createdAt: -1 });

    res.json({ message: "Dashboard data", submissions });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
