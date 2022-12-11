const express = require('express');
const userRoute = require('./src/routes/user.route');
const app = express();

app.use('/', userRoute)

const PORT = 3000
app.listen(PORT, console.log(`Aplicação rodando na porta: ${PORT}`));