import express from 'express';
import connectDatabase from './src/database/database.js';
import userRoute from './src/routes/user.route.js';
import dotenv from "dotenv"

dotenv.config()

const PORT = 3000;
const app = express();

connectDatabase()
app.use(express.json());
app.use('/user', userRoute);


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));