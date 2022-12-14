import express from 'express';
import connectDatabase from './database/database.js';
import dotenv from "dotenv"


import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import newsRoute from './routes/news.route.js'
import swaggerRoute from './routes/swagger.route.cjs'

import cors from 'cors'
dotenv.config()





const port = process.env.PORT || 3000
const app = express();
app.use((req, res, next)=>{

    res.header("Access-Control-Allow-Origin","*")
    app.use(cors())
    next()
})
connectDatabase()

app.use(express.json());
app.use('/user', userRoute);
app.use('/auth', authRoute);
app.use('/news', newsRoute);
app.use('/doc', swaggerRoute);

app.listen(port, () => console.log(`Server running on port: ${port}`));