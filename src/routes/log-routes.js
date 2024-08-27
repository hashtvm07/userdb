const express = require("express");
const { getLog } = require("../controllers/log-controller");

const router = express.Router();

router.get('/', getLog);

export default router;