import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    userID: String,
    username: String,
    password: String,
    puzzles: {
        type: [String],
        default: []
    },
    points: {
        type: Number,
        default: 0
    },
    joinDate: {
        type: Date,
        default: new Date()
    }
}, {collection: 'users_data'});

const Users = mongoose.model('Users', userSchema);

export default Users;