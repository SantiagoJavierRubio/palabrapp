import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    secret: String,
    words: [Object],
    creator: String,
    rating: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PostPuzzle = mongoose.model('PostPuzzle', postSchema);

export default PostPuzzle;
