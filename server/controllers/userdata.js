import Users from '../models/users.js';
import PostPuzzle from '../models/postPuzzle.js';
import bcrypt from 'bcryptjs';


export const signUp = async (req, res) => {

    const user_data = req.body;

    const registerUser = async (hashedPassword) => {
        const new_user_data = {
            userID: user_data.id,
            username: user_data.username,
            password: hashedPassword,
        }
        const newUser = new Users(new_user_data)
        try {
            await newUser.save();
            res.status(200).json(newUser)
        } catch (err) {
            res.status(409).json({ message: err.message });
        }
    }

    const password = user_data.password;
    const saltRounds = 10;
    
    await bcrypt.genSalt(saltRounds, (saltError, salt) => {
        if(saltError) {
            throw saltError;
        } else {
            bcrypt.hash(password, salt, (hashError, hash) => {
                if(hashError) {
                    throw hashError;
                } else {
                    registerUser(hash);
                }
            })
        }
    })
}

export const getUser = async (req, res) => {
    try {
        const user = await Users.findOne({ "userID": req.params.id })
        delete user.password;
        res.status(200).json(user);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

export const updateUser = async (req, res) => {
    const input_data = req.body;
    try{
        const user = await Users.findOne({ "userID": input_data.userID });
        await PostPuzzle.find({ '_id': {$in: user.puzzles} }, (err, docs) => {
            docs.forEach(doc => {
                doc.creator.username = input_data.input.username;
                doc.save();
            })
        })
        user.username = input_data.input.username;
        user.profile.about = input_data.input.about;
        user.profile.image = input_data.input.image;
        user.save();
        delete user.password;
        res.status(200).json(user);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

export const authUser = async (req,res) => {
    const log_data = req.body;
    const user_data = await Users.findOne({ "userID": log_data.id });
    bcrypt.compare(log_data.password, user_data.password, (error, isMatch) => {
        if(error){
            throw error
        } else if (!isMatch) {
            res.status(200).json({ valid: false });
        } else {
            res.status(200).json(user_data);
        }
    });
}

export const getPuzzles = async (req,res) => {
    const user = req.params.id;
    try{
       const puzzles = await PostPuzzle.find({"creator.userID": user});
       res.status(200).json({puzzles: puzzles});
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
    
}

// Only to clean data during production, remove before build.
export const emptyUsers = async (req, res) => {
    try {
        await Users.deleteMany({});
        res.status(200).json({ message: "users deleted" });
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}