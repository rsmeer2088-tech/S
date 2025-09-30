const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// إعداد رفع الملفات
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// واجهة رئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// رفع الملفات
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).send('لا يوجد ملف');
    res.send({ message: 'تم رفع الملف بنجاح', file: req.file });
});

// مثال دردشة
app.post('/chat', async (req, res) => {
    const { message } = req.body;
    res.send({ reply: `تلقينا: ${message}` });
});

// مثال ترجمة نص
app.post('/translate', async (req, res) => {
    const { text, target } = req.body;
    res.send({ translated: `(${target}) ${text}` });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
