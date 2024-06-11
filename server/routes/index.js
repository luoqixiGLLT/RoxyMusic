const express = require('express');
const router = express.Router();
import {Music, Playlist} from '../models/index'

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

router.get('/music', async (req, res) => {
    const {page = 1, pageSize = 10, language} = req.body
    const query = {}
    if (language) {
        query.language = language
    }
    let music = await Music.find(query).skip((page - 1) * 10).limit(pageSize)
    res.send({
        code: 200,
        music
    })
});

router.get('/playlist', async (req, res) => {
    const {page = 1, pageSize = 10} = req.body
    const query = {}
    let playlist = await Playlist.find(query).skip((page - 1) * 10).limit(pageSize)
    res.send({
        code: 200,
        playlist
    })
});
module.exports = router;
