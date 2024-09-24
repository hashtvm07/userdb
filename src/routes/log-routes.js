const express = require("express");
const { getLog, getOldLogs } = require("../controllers/log-controller");

const router = express.Router();

router.get('/', getLog);
router.get('/oldlogs', getOldLogs);
// router.get('/dropxcompany', dropxcompany);

module.exports = { logRoutes: router };
