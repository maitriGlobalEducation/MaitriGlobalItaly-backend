import express from "express";
import { body, validationResult } from "express-validator";
import FormSubmission from "../models/FormSubmission.js";
import sendConfirmationEmail from "../utils/sendEmail.js";
import geoip from "geoip-lite";

const router = express.Router();

const formValidation = [
  body("fullName").notEmpty().withMessage("Full name is required"),
  body("dateOfBirth").notEmpty().withMessage("Date of birth is required"),
  body("gender").notEmpty().withMessage("Gender is required"),
  body("nationality").notEmpty().withMessage("Nationality is required"),
  body("currentCountry").notEmpty().withMessage("Current country is required"),
  body("phone").notEmpty().withMessage("Phone number is required"),
  body("email").isEmail().withMessage("Valid email is required"),

  body("position").notEmpty().withMessage("Position is required"),
  body("qualification").notEmpty().withMessage("Qualification is required"),
  body("yearOfGraduation")
    .notEmpty()
    .isNumeric()
    .withMessage("Year must be a number"),
  body("councilRegistered")
    .notEmpty()
    .withMessage("Council registration is required"),
  body("docsReady").notEmpty().withMessage("Document status is required"),
  body("passportStatus").notEmpty().withMessage("Passport status is required"),

  body("italianKnowledge")
    .notEmpty()
    .withMessage("Italian knowledge is required"),
  body("languageMode")
    .notEmpty()
    .withMessage("Preferred language mode is required"),
  body("availabilityDate")
    .notEmpty()
    .withMessage("Availability date is required"),

  // Optional: notes
  body("notes").optional(),
];

// POST /api/form
router.post("/", formValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const ip =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress || "Unknown";
    const geo = geoip.lookup(ip) || {};

    const newSubmission = new FormSubmission({
      ...req.body,
      submittedIp: ip,
      submittedCountry: geo.country || "Unknown",
    });
    await newSubmission.save();

    // Respond to client first
    res
      .status(200)
      .json({
        message: "Form submitted successfully. Confirmation email will be sent.",
      });

    // Send email in the background
    sendConfirmationEmail({
      to: req.body.email,
      name: req.body.fullName,
    }).catch(err => {
      // Optionally log email errors
      console.error("Email sending error (background):", err.message);
    });

  } catch (err) {
    console.error("Error in form submission:", err);
    return res
      .status(500)
      .json({ error: "An internal error occurred. Please try again later." });
  }
});

export default router;
