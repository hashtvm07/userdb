const express = require("express");
const {
  getAllErsaReports,
  saveErsaReport,
  getErsaReportsByEmail,
} = require("../controllers/ersa-controller");

const router = express.Router();

router.get("/", getAllErsaReports);
router.post("/", saveErsaReport);
router.get("/:email", getErsaReportsByEmail);

module.exports = { ersaRoutes: router };
