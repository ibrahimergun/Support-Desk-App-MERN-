const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const fs = require('fs');

const userRoutes = require('./routes/userRoutes');
const ticketsRoutes = require('./routes/ticketsRoutes');

require('dotenv').config();

connectDB();

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.get('/', (_, res) => {
  res.status(200).json({ message: 'Welcome to the Support Desk API' });
});

app.use('/api/users', userRoutes );
app.use('/api/tickets', ticketsRoutes);


app.use((error, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown occured' });
});


app.listen(process.env.PORT);




