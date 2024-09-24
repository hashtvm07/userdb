const express = require("express");
const { registerCompany, getAllCompanies, getCompany } = require("../controllers/company-controller");

const router = express.Router();

router.get('/getAll', getAllCompanies);
router.get('/:email', getCompany);
router.post('/register', registerCompany);
// router.put('/:id', updateCompany);

module.exports = { companyRoutes: router };