import PostPuzzle from '../models/postPuzzle.js';
import diccionario from './diccionario.json';

export const getPosts = async (req, res) => {
    try {
        const postPuzzles = await PostPuzzle.find();
        res.status(200).json(postPuzzles);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const createPost = async (req,res) => {
    const post = req.body;
    const word = post.secret;

    for (let letter of word) {
        
    }

    const newPost = new PostPuzzle(post);
    try {
        await newPost.save();
        res.status(200).json(newPost);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}