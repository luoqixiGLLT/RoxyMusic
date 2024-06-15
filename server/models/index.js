// import mongoose from "./join.js";
const mongoose = require('./join')

const musicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        default: '未知歌手',
    },
    album: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true,
    },
    language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language',
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    audio: {
        type: String,
        required: true
    },
    lyric: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        default: 0
    },
    play: {
        type: Number,
        default: 0
    },
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    share: {
        type: Number,
        default: 0
    },
})
const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
})
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        default: '未设置',
    },
    info: {
        type: String,
        default: '这个人很懒，什么都没写'
    },
    address: {
        type: String,
        default: '输入所在地区'
    },
    background: {
        type: String,
        default: 'http://localhost:3001/background.jpg'
    },
    avatar: {
        type: String,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Music'
    }],
    favorite: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist'
    }],
})
const playlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    info: {
        type: String,
        default: '对歌单进行描述'
    },
    cover: {
        type: String,
        required: true
    },
    musics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Music'
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        default: ''
    }
})
const language = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
})
let newsSchema = new mongoose.Schema({
    senderId: String,
    senderId2: String,
    message: String,
    product: {
        ref: "fz",
        type: mongoose.Types.ObjectId
    },

})
let userSchemas = new mongoose.Schema({
    user: String,
    pwd: String,
    phone: String,
    userName: String,
    img: String,
    fllower: [mongoose.Types.ObjectId],
    fans: [mongoose.Types.ObjectId],
    news: [mongoose.Types.ObjectId]
})
let userDB = mongoose.model("user", userSchemas, "user")
let newsDB = mongoose.model("news", newsSchema, "news")
const Music = mongoose.model('Music', musicSchema, 'music')
const Playlist = mongoose.model('Playlist', playlistSchema, 'playlist')
const Artist = mongoose.model('Artist', artistSchema, 'artist')
const User = mongoose.model('User', userSchema, 'user')
const Language = mongoose.model('Language', language, 'language')
let FzSchema = new mongoose.Schema({
    src: String,
    title: String,
    price: String,
    vipPrice: String,
    shopDescription: String,
    delivery: String,
    shopName: String,
})

let fzDB = mongoose.model("fz", FzSchema, "fz")
// export {
//     Music,
//     Playlist,
//     User,
//     Artist,
//     Types,
//     Language,
// }
module.exports = {
    Music,
    Playlist,
    User,
    Artist,
    Language,
    newsDB,
    userDB,
    fzDB
}