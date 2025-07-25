const express = require('express');
const router = express.Router();
const { uploadExcel } = require('../controllers/excelController');
const { authMiddleware } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { getUserUploads } = require('../controllers/excelController');


router.post('/upload', authMiddleware, upload.single('excelFile'), uploadExcel);
router.get('/my-uploads', authMiddleware, getUserUploads);

module.exports = router;