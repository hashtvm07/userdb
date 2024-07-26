const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { encryptData, decryptData } = require("../utils/encryption");
const axios = require("axios");

// API key middleware
const apiKeyAuth = (req, res, next) => {
  const apiKey = req.header("X-API-Key");
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: "Invalid API key" });
  }
  next();
};

// Authenticate user
router.post("/login", apiKeyAuth, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Call external login API
    const externalLoginResponse = await axios.post(
      process.env.EXTERNAL_LOGIN_API,
      { email, password }
    );

    if (!externalLoginResponse.data.authenticated) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const user = await User.findOne({ email_id: email }).populate("modules");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const decryptedModules = user.modules.map((module) => ({
      id: decryptData(module.id),
      en_name: decryptData(module.en_name),
      ar_name: decryptData(module.ar_name),
    }));

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, modules: decryptedModules });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Authorize user
router.post("/authorize", apiKeyAuth, async (req, res) => {
  try {
    const { userId, moduleId } = req.body;
    const user = await User.findById(userId).populate("modules");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hasAccess = user.modules.some(
      (module) => decryptData(module.id) === moduleId
    );

    res.json({ authorized: hasAccess });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
