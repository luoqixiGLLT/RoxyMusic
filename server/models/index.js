const mongoose = require('./join')

const musicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
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
    }
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
    avatar: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Music'
    }],
    favorite: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist'
    }],
    define: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist'
    }]
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Types',
        required: true
    }
})
const types = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
})
const language = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
})

const Music = mongoose.model('Music', musicSchema, 'music')
const Playlist = mongoose.model('Playlist', playlistSchema, 'playlist')
const Artist = mongoose.model('Artist', artistSchema, 'artist')
const User = mongoose.model('User', userSchema, 'user')
const Types = mongoose.model('Types', types, 'types')
const Language = mongoose.model('Language', language, 'language')

module.exports = {
    Music,
    Playlist,
    User,
    Artist,
    Types,
    Language,
}