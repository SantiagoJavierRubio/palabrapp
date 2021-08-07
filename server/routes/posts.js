import express from 'express';
import { getPosts, createPost, getWords, getPuzzle, emptyPosts } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);

router.post('/new', createPost);

router.post('/get_words', getWords);

router.get('/:id', getPuzzle);

router.post('/production/empty_posts', emptyPosts);

export default router;