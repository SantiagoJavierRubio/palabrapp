import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    clue: String,
    secret: String,
    words: [Object],
    definitions: [Object],
    usersInfo: {
        type: [Object],
        default: [{'userID': 'none', 'gameState': { incomplete: [], wrong: [], correct: [], vertical: false }}]
    },
    creator: {
        userID: String,
        username: String
    },
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
            type: [Number]
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

postSchema.methods.saveProgress = function(userID, gameState) {
    this.usersInfo.forEach(user => {
        if(user.userID === userID){
            user['gameState'] = gameState;
            return;
        }
    })
    this.usersInfo.push({ 'userID': userID, 'gameState': gameState })
}

const PostPuzzle = mongoose.model('PostPuzzle', postSchema);

export default PostPuzzle;
