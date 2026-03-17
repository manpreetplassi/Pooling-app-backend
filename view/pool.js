import express from 'express';
const router = express.Router();

router.put('/add_vote', addVote)
router.put('/remove_vote', removeVote)

export default router;
