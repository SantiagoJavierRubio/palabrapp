import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    secret: String,
    words: [Object],
    definitions: [Object],
    creator: Object,
    stats: {
        timesPlayed: {
            type: Number,
            default: 0
        },
        timesCompleted: {
            type: Number,
            default: 0
        },
        allRatings: {
            type: [Number],
            default: 0
        },
        rating: {
            type: Number,
            default: 0
        }
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

postSchema.methods.played = function() {
    this.stats.timesPlayed += 1;
}

postSchema.methods.completed = function() {
    this.stats.timesCompleted +=1;
}

postSchema.methods.rate = function(new_rating) {
    this.stats.allRatings.push(new_rating);
    const new_sum = this.stats.allRatings.reduce((a, b) => a + b);
    this.stats.rating = new_sum/this.stats.allRatings.length;
}

const PostPuzzle = mongoose.model('PostPuzzle', postSchema);

export default PostPuzzle;
