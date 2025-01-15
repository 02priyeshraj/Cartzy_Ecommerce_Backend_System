const express = require('express');
const {
  getAllUsers,
  updateUserDetails,
  disableUserAccount,
} = require('../../controllers/admin/userController');

const router = express.Router();

router.get('/users', getAllUsers);
router.put('/users/:id', updateUserDetails);
router.put('/users/:id/disable', disableUserAccount);

module.exports = router;
