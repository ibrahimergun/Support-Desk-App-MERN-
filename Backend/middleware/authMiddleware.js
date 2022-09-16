const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userSchema');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decodedToken = jwt.verify(token, process.env.JWT_KEY);

      req.user = await User.findById(decodedToken.id).select('-password');
      if (!req.user) {
        res.status(401);
        throw new Error('Authorization failed. Please try again');
      }
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Authorization failed.Please try again later');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Please try again Unknown error. Please try again later');
  }
});
module.exports = { protect };
