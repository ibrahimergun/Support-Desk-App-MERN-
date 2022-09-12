const express = require('express');
const router = express.Router();

const {
    getTickets
  } = require('../controllers/ticketsController');

  router.get('/', getTickets);

  module.exports = router;

