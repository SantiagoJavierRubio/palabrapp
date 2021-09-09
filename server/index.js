import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

// App setup
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

// Landing page
app.get('/', (req, res) => {
    res.send('Welcome to PalabrApp API');
});

// DB setup
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(err => console.log(err.message));

mongoose.set('useFindAndModify', false);

//

