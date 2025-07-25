const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ExcelFile = require('../models/ExcelFile');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Get all users
router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Get all uploaded files
router.get('/uploads', authMiddleware, adminMiddleware, async (req, res) => {
  const files = await ExcelFile.find().populate('userId', 'name email');
  res.json(files);
});

// Optional: delete user
router.delete('/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: 'User deleted' });
});

// Optional: delete file
router.delete('/uploads/:id', authMiddleware, adminMiddleware, async (req, res) => {
  await ExcelFile.findByIdAndDelete(req.params.id);
  res.json({ msg: 'File deleted' });
});

module.exports = router;