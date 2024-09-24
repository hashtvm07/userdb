const { Request, Response } = require("express");
const OldLog = require("../models/oldlog");
const asyncHandler = require("../utils/async-handler");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

exports.getLog = asyncHandler(async (req, res) => {
  try {
    console.log("log controller called");
    let oldlogs = await OldLog.find({});
    res.status(200).json(oldlogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
exports.getOldLogs = async (req, res) => {
  const logsDirectory = path.join(__dirname, "../../iisnode");

  fs.readdir(logsDirectory, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan directory: " + err);
    }

    files.forEach((file) => {
      const filePath = path.join(logsDirectory, file);
      fs.readFile(filePath, "utf8", async (err, data) => {
        if (err) {
          console.error("Error reading file:", filePath, err);
          return;
        }

        const logEntry = new OldLog({
          filename: file,
          content: data,
        });

        try {
          await logEntry.save();
          console.log("Log saved:", file);

          // Delete the log file after saving
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Error deleting file:", filePath, unlinkErr);
            } else {
              console.log("File deleted:", filePath);
            }
          });
        } catch (saveErr) {
          console.error("Error saving log to MongoDB:", saveErr);
        }
      });
    });

    res.send("Logs are being processed and saved to MongoDB.");
  });
};

// exports.dropxcompany = asyncHandler(async (req, res) => {
//   companyModel = mongoose.model("Company");
//   dropCollection(companyModel, res);
// });
// async function dropCollection(dmodel, res) {
//   console.log("Dropping Company..");
//   try {
//     await dmodel.collection.drop();
//     console.log("Collection dropped successfully");
//     res.status(200).json({ Status: "Collection Dropped Successfuly" });
//   } catch (err) {
//     console.error("Error dropping collection:", err);
//     res.status(400).json({ Status: "Error dropping collection.." });
//   }
// }
