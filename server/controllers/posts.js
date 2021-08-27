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
        word.played();
        await word.save();
        res.status(200).json(word);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

export const setCompleted = async (req,res) => {
    const clientData = req.body;
    try{
        const user = await Users.findOne({ "userID": clientData.userID });
        user.completedPuzzle(clientData.puzzleID);
        await user.save();
        delete user.password;
        const puzzle = await PostPuzzle.findById(clientData.puzzleID);
        puzzle.completed();
        await puzzle.save();
        res.status(200).json({ puzzle: puzzle, user: user });
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
    
}

export const setRating = async (req, res) => {
    const clientData = req.body;
    try{
        const puzzle = await PostPuzzle.findById(clientData.puzzleID);
        puzzle.rate(clientData.rating)
        await puzzle.save();
        const user = await Users.findOne({ "userID": clientData.userID });
        user.ratedPuzzle(clientData.puzzleID);
        await user.save()
        res.status(200).json(puzzle);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

export const saveProgress = async (req,res) => {
    const clientData = req.body;
    try {
        const puzzle = await PostPuzzle.findById(clientData.puzzleID);
        await puzzle.saveProgress(clientData.userID, clientData.gameState);
        await puzzle.save();
        res.status(200).json(puzzle)
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

export const deletePost = async (req, res) => {
    try{
        await PostPuzzle.deleteOne({ '_id': req.body.puzzleID })
        res.status(200)
    } catch (err){
        res.status(409).json({ message: err.message })
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