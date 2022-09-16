const express = require('express');
// const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const fs = require('fs');

const userRoutes = require('./routes/userRoutes');
const ticketsRoutes = require('./routes/ticketsRoutes');

require('dotenv').config();

connectDB(); // Mongoose

const app = express();

//json parser and Url encoded !!!
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

//Cors allow
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.get('/', (_, res) => {
  res.status(200).json({ message: 'Welcome to the Support Desk API' });
});

app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketsRoutes);


//This is error handler for known errors.
app.use(errorHandler);

//This is error handler for unknown and unexpected errors. 
app.use((error, res, next) => {
  res.status(res.code || 500);
  res.json({ message: error.message || 'An unknown occured' });
});

app.listen(process.env.PORT);
