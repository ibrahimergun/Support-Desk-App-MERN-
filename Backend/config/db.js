const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose
      .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1chw7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      )
      .then(() => {
        //console.log('MongoDB Connected')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  module.exports = connectDB;

