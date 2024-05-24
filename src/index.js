import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import dbConnect from './utilities/dbConnect.js';
import userRoutes from './routes/userRoutes.js'
dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(bodyParser.json())
const PORT = process.env.PORT || 5000;

dbConnect();

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



