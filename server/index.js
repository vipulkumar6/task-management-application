import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import route from './routes/taskRoute.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// Middleware
app.use(bodyParser.json());

app.use("/", route)


// vercel configuration

// Allow all origins
// Allow specific origin(s) 
app.use(cors());

app.use(cors({
    origin: 'https://task-management-application-fuph.vercel.app/',
    methods: ['POST', 'GET'],
    credentials: true
}));

// MongoDB connection
const db = process.env.DB_URL;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


const PORT = process.env.PORT;
console.log(PORT)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
