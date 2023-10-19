import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoutes from './routes/booksRoute.js'
import cors from 'cors'

const app = express();

app.use(express.json())

// Middleware for handling CORS POLICY
app.use(cors());

// app.use(
//     cors({
//         origin: 'https://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )

app.get("/", (req, res) => {
    res.status(200).send('Welcome')
})

app.use('/books', booksRoutes)

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");

        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`);
        })
    })
    .catch(err => {
        console.error(err);
    })