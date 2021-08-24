import express from 'express';
import { signUp, getUser, emptyUsers, authUser, getPuzzles, updateUser } from '../controllers/userdata.js';

const router = express.Router();

router.post('/new', signUp);
router.get('/:id', getUser)
router.post('/production/empty_users', emptyUsers);
router.post('/validate', authUser);
router.get('/:id/puzzles', getPuzzles);
router.post('/update', updateUser)


export default router;