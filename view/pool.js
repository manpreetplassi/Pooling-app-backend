import express from 'express';
import { createPool, getAllPools } from '../controllers/pool.js';
const router = express.Router();

// router.put('/remove_vote', removeVote)
router.get('/pool', getAllPools)
router.post('/create_pool', createPool)

export default router;

