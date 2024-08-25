import express from 'express';
import { getAllErsaReports, saveErsaReport } from '../controllers/ersa-controller';

const router = express.Router();

router.get('/', getAllErsaReports);
router.post('/saveErsaReport', saveErsaReport);

export default router;