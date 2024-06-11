const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');

const cors = require('cors')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const uploadRouter = require('./routes/upload')

const app = express();

// 如果您的API需要处理JSON和URL编码数据，保留下面两行。
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())

// 如果您的API需要使用cookies，保留cookieParser中间件。
app.use(cookieParser());

// 如果您的API需要提供静态资源，保留下面一行。
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/upload', uploadRouter);

// 错误处理
app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
    });
});

module.exports = app;