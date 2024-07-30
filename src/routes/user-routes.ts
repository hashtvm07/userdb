import express from 'express';
import { registerUser, updateUser, deleteUser, getAllUsers } from '../controllers/user-controller';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/register', registerUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;