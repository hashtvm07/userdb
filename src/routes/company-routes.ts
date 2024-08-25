import express from 'express';
import { registerCompany, updateCompany, getAllCompanies, getCompany } from '../controllers/company-controller';

const router = express.Router();

router.get('/getAllCompanies', getAllCompanies);
router.get('/:email', getCompany);
router.post('/register', registerCompany);
router.put('/:id', updateCompany);

export default router;