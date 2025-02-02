const express = require('express');
const authenticate= require('../../middlewares/authMiddleware');
const {
  processRequest,
} = require('../../controllers/admin/returnExchangeController');

const router = express.Router();

router.put('/admin/return-exchange/:requestId', authenticate, processRequest);

module.exports = router;
