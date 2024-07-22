const express = require('express');
const multer = require('multer');
const { analyzeText } = require('../controllers/aiController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), analyzeText);

module.exports = router;
