const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Module = require("../models/Module");
const { encryptData } = require("../utils/encryption");

// API key middleware
const apiKeyAuth = (req, res, next) => {
  const apiKey = req.header("X-API-Key");
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: "Invalid API key" });
  }
  next();
};

// Register a new user
router.post("/register", apiKeyAuth, async (req, res) => {
  try {
    const userData = req.body;
    const encryptedUserData = {};

    for (const [key, value] of Object.entries(userData)) {
      encryptedUserData[key] = encryptData(value);
    }

    const allModules = await Module.find();
    encryptedUserData.modules = allModules.map((module) => module._id);

    const user = new User(encryptedUserData);
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Import bulk users
router.post("/import", apiKeyAuth, async (req, res) => {
  try {
    const users = req.body;
    const allModules = await Module.find();

    for (const userData of users) {
      const encryptedUserData = {};

      for (const [key, value] of Object.entries(userData)) {
        encryptedUserData[key] = encryptData(value);
      }

      encryptedUserData.modules = allModules.map((module) => module._id);

      await User.findOneAndUpdate(
        { email_id: encryptedUserData.email_id },
        encryptedUserData,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }

    res.status(200).json({ message: "Users imported successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
