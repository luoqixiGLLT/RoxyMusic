const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const { createServer } = require("http")
const cors = require('cors')
let http = createServer()
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const uploadRouter = require('./routes/upload')
let { newsDB, productDB } = require("./models/index")
const app = express();
let io = require("socket.io")(http, { cors: { origin: "*" } })
let data
let users = {}
// 如果您的API需要处理JSON和URL编码数据，保留下面两行。
app.use(express.json());
app.use(express.urlencoded({ extended: false })); +
    io.on('connection', (socket) => {
        console.log('New client connected');
        // 用户登录
        socket.on('login', (userId) => {
            // 将用户信息存储在服务器端
            users[userId] = socket.id;
            //登陆后将id返回给客户端
            socket.emit("user_id", users)
        });
        // 监听来自客户端的私聊消息
        socket.on('private_message', async ({ user1, user2 }) => {
            //根据发送者和接收者的id从数据库将数据拿出来
            data = await newsDB.find({ $or: [{ senderId: user1, senderId2: user2 }, { senderId: user2, senderId2: user1 }] })
            io.emit('private_message', data);

        });
        // 断开连接时执行的操作
        socket.on('disconnect', () => {
            console.log('Client disconnected');
            // 在用户断开连接时清除用户信息 
            Object.keys(users).forEach((userId) => {
                if (users[userId] === socket.id) {
                    delete users[userId];
                }
            });
        });
    });
http.listen(5000);
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