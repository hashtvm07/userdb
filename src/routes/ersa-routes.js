const express = require("express");
const { getAllErsaReports, saveErsaReport } = require("../controllers/ersa-controller");

const router = express.Router();

router.get('/', getAllErsaReports);
router.post('/', saveErsaReport);

module.exports = { ersaRoutes: router };