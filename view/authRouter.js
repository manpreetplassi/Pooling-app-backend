import express from 'express';
import { loginAuth, registerAuth } from '../controllers/auth.js';
const router = express.Router();


router.put('/login', loginAuth)

router.post('/signup', registerAuth)


export default router;
