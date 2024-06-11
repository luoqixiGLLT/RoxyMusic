const express = require('express');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv'); // 引入dotenv用于管理环境变量
dotenv.config(); // 加载环境变量

const router = express.Router();

// 设置存储引擎
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/imgs')); // 确保目标目录存在且可写
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // 保持原始文件扩展名
    }
});

// 文件过滤器，仅允许某些类型的文件上传
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only JPEG, PNG, and GIF are allowed.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 限制文件大小为5MB
});

// 处理图片上传的路由
router.post('/image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ code: 400, msg: 'No file uploaded' });
    }

    // 使用环境变量配置基础URL
    const imageUrl = `${process.env.BASE_URL}/public/imgs/${req.file.filename}`;
    res.status(200).send({ code: 200, msg: 'File uploaded successfully', url: imageUrl });
});

// 错误处理中间件，捕获multer的错误
const errorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).send({ code: 400, msg: err.message });
    }
    next(err);
};
router.use(errorHandler);

module.exports = router;
