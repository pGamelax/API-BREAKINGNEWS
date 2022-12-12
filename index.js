import express from 'express';
import connectDatabase from './src/database/database.js';
import userRoute from './src/routes/user.route.js';

const PORT = 3000;
const app = express();

connectDatabase()
app.use(express.json());
app.use('/user', userRoute);


app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`));