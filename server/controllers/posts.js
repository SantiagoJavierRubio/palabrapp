import PostPuzzle from '../models/postPuzzle.js';
import DefinedWords from '../models/words.js';
import Users from '../models/users.js';

export const getPosts = async (req, res) => {
    try {
        const postPuzzles = await PostPuzzle.find();
        res.status(200).json(postPuzzles);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const createPost = async (req, res) => {
    
    const post = req.body;
    const newPost = new PostPuzzle(post);
    try {
        await newPost.save();
        await Users.findOne({"userID": post.creator.userID}, (err, user) => {
                    if(err){
                        console.log(err)
                    } else {
                        user.puzzles.push(newPost._id);
                        user.save();
                    }
                });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

export const getWords = async (req, res) => {
    const word = req.body.secret;

    const validWords = {};
    
    try {
        for (let letter of word) {
            if (!validWords[letter]){
                validWords[letter] = await DefinedWords.find({ "palabra": {$regex: `${letter}`, $options:"i"}});
            }
        }
        res.status(200).json(validWords);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

export const getPuzzle = async (req, res) => {
    try {
        const word = await PostPuzzle.findById(req.params.id);
        res.status(200).json(word);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

// Only to clean data during production, remove before build.
export const emptyPosts = async (req, res) => {
    try {
        await PostPuzzle.deleteMany({});
        res.status(200).json({ message: "posts deleted" });
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}