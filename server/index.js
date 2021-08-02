import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';

// App setup
const app = express();

app.use('/posts', postRoutes);

app.use(express.json());
app.use(cors());

// DB setup
const CONNECTION_URL = 'mongodb+srv://santirubio1991:123789456@cluster0.u8itc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(err => console.log(err.message));

mongoose.set('useFindAndModify', false);

//

