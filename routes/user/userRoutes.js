const express = require('express');
const {
  signup,
  login,
  updatePersonalDetails,
  manageAddress,
  changePassword,
  logout,
} = require('../../controllers/user/userController');
const authenticate = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.put('/profile', authenticate, updatePersonalDetails);
router.put('/address', authenticate, manageAddress);
router.put('/password', authenticate, changePassword);
router.post('/logout', authenticate, logout);

module.exports = router;
