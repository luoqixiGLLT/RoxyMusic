const express = require('express');
const router = express.Router();
const socket = require('socket.io');
const http = require('http');
const { Music, Playlist } = require('../models/index');
const { User } = require("../models");
const { Artist, userDB, newsDB, fzDB } = require("../models/index.js");
const server = http.createServer()
/* GET home page. */
router.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
});
const io = socket(server, {
    cors: {
        origin: '*' // 配置跨域
    }
});
io.on('connection', sock => {
    console.log('连接成功...')
    // 向客户端发送连接成功的消息
    sock.emit('connectionSuccess');
    sock.on('joinRoom', (roomId) => {
        sock.join(roomId);
        console.log('joinRoom-房间ID：' + roomId);
    })

    // 广播有人加入到房间
    sock.on('callRemote', (roomId) => {
        io.to(roomId).emit('callRemote')
    })

    // 广播同意接听视频
    sock.on('acceptCall', (roomId) => {
        io.to(roomId).emit('acceptCall')
        console.log(roomId);
    })

    // 接收offer
    sock.on('sendOffer', ({ offer, roomId }) => {
        io.to(roomId).emit('sendOffer', offer)
    })

    // 接收answer
    sock.on('sendAnswer', ({ answer, roomId }) => {
        io.to(roomId).emit('sendAnswer', answer)
    })

    // 收到candidate
    sock.on('sendCandidate', ({ candidate, roomId }) => {
        io.to(roomId).emit('sendCandidate', candidate)
    })

    // 挂断结束视频
    sock.on('hangUp', (roomId) => {
        io.to(roomId).emit('hangUp')
    })
})
server.listen(3000, () => {
    console.log('服务器启动成功');
});
router.get('/music', async (req, res) => {
    try {
        const { page = 1, pageSize = 10, language, artist } = req.query;

        let query = {};
        if (language) {
            query.language = language;
        }
        if (artist) {
            query.artist = { $regex: new RegExp(artist, 'i') };
        }

        console.log(query);
        const music = await Music.find(query)
            .skip((parseInt(page, 10) - 1) * parseInt(pageSize, 10))
            .limit(parseInt(pageSize, 10))
            .populate('artist')
            .populate('language');


        res.status(200).send({ code: 200, music });
    } catch (error) {
        res.status(500).send({ code: 500, msg: '服务器错误', error: error.message });
    }
});

router.get('/playlist', async (req, res) => {
    try {
        const { page = 1, pageSize = 10, type } = req.query;
        const query = {};

        if (type) query.type = type;

        const playlist = await Playlist.find(query)
            .skip((page - 1) * pageSize)
            .limit(parseInt(pageSize));

        res.status(200).send({ code: 200, playlist });
    } catch (error) {
        res.status(500).send({ code: 500, msg: 'Internal Server Error', error: error.message });
    }
});

router.post('/add_playlist', async (req, res) => {
    try {
        const playlist = await Playlist.create(req.body);
        res.status(200).send({ code: 200, msg: 'Playlist added successfully', playlist });
    } catch (error) {
        res.status(500).send({ code: 500, msg: 'Failed to add playlist', error: error.message });
    }
});

router.post('/playlist_add_music', async (req, res) => {
    try {
        const { _id, musics } = req.body;
        const result = await Playlist.updateOne({ _id }, { $addToSet: { musics: { $each: musics } } });

        if (result.nModified > 0) {
            res.status(200).send({ code: 200, msg: 'Music added to playlist successfully' });
        } else {
            res.status(404).send({ code: 404, msg: 'Playlist not found or no music added' });
        }
    } catch (error) {
        res.status(500).send({ code: 500, msg: 'Failed to add music to playlist', error: error.message });
    }
});

router.get('/user_info', async (req, res) => {
    try {
        const user = await User.findById(req.query._id).populate('likes').populate('favorite').populate('define');
        if (user) {
            res.status(200).send({ code: 200, user });
        } else {
            res.status(404).send({ code: 404, msg: 'User not found' });
        }
    } catch (error) {
        res.status(500).send({ code: 500, msg: 'Internal Server Error', error: error.message });
    }
});
//获取消息
router.get('/getTalk', async (req, res) => {
    let { user1, user2 } = req.query
    let data = await newsDB.find({ $or: [{ senderId: user1, senderId2: user2 }, { senderId: user2, senderId2: user1 }] }).populate("product")
    res.send({
        code: 200,
        data
    })

})
//获取用户信息
router.get("/userText", async (req, res) => {
    data.fans = await userDB.find({ _id: { $in: data.fans } })
    data.fllower = await userDB.find({ _id: { $in: data.fllower } })
    data.news = await userDB.find({ _id: { $in: data.news } })
    res.send({
        code: 200,
        data
    })
})

router.get("/getFz", async (req, res) => {
    data = await fzDB.find()
    res.send({
        data
    })
})
//添加消息
router.post("/addNews", async (req, res) => {
    let data = req.body
    await newsDB.create(data)
    res.send({
        code: 200
    })
})
//获取消息
router.get('/getTalk2', async (req, res) => {

    let data = await newsDB.find().populate("product")
    res.send({
        code: 200,
        data
    })

})


module.exports = router;
