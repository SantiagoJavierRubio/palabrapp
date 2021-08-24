import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    userID: String,
    username: String,
    password: String,
    puzzles: {
        type: [String],
        default: []
    },
    completedPuzzles: {
        type: [String],
        default: []
    },
    ratedPuzzles: {
        type: [String],
        default: []
    },
    points: {
        type: Number,
        default: 0
    },
    profile: {
        about: {
            type: String,
            default: '-'
        },
        image: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: 'blue'
        }
    },
    joinDate: {
        type: Date,
        default: new Date()
    }
}, {collection: 'users_data'});

userSchema.methods.completedPuzzle = function(puzzleID){
    if(!this.puzzles.includes(puzzleID) && !this.completedPuzzles.includes(puzzleID)){
        this.completedPuzzles.push(puzzleID);
        this.points += 1;
    }
}
userSchema.methods.ratedPuzzle = function(puzzleID){
    if(!this.ratedPuzzles.includes(puzzleID)){
        this.ratedPuzzles.push(puzzleID);
    }
}

const Users = mongoose.model('Users', userSchema);

export default Users;