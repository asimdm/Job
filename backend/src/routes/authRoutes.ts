import { Router } from 'express';
import { signup, login, logout, getUsers } from '../controllers/authController';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/users', getUsers);

export default router;