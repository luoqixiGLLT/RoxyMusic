import fs from 'fs-extra';
import path from 'path';
import mongoose from 'mongoose';
import sharp from 'sharp';
import {Music, Artist} from './index.js';
import {parseFile} from 'music-metadata';

const musicDir = './music';
const baseUrl = 'http://localhost:3001/music/';
const singerDir = './singers';

// 递归创建目录
async function ensureDirectoryExists(directory) {
    await fs.ensureDir(directory);
}

function sanitizeFileName(filename) {
    // 替换所有非法字符，这里使用下划线作为替代字符
    const sanitized = filename.replace(/[\\/:*?"<>|\r\n]+/g, '_');
    // 防止文件名以点开头（隐藏文件），如果以点开头则添加下划线
    return sanitized.startsWith('.') ? '_' + sanitized : sanitized;
}

async function processFiles() {
    const files = await fs.readdir(musicDir);
    for (const file of files) {
        const ext = path.extname(file);
        const name = path.basename(file, ext);
        const [title, artistName] = name.split(' - ');

        if (ext === '.mp3') {
            // 原文件路径
            const songDir = path.join(musicDir, title);
            const mp3Path = path.join(musicDir, file);
            const lrcPath = path.join(musicDir, `${title}.lrc`);

            // 递归创建目录
            await ensureDirectoryExists(songDir);

            const metadata = await parseFile(mp3Path);

            let coverUrl = '';
            if (metadata.common.picture && metadata.common.picture.length > 0) {
                const cleanTitle = sanitizeFileName(title);
                const coverData = metadata.common.picture[0].data;
                // 然后使用cleanTitle来生成路径
                const coverPath = path.join(songDir, `${cleanTitle}.jpg`);
                if (!fs.existsSync(coverPath)) {
                    await sharp(coverData).toFile(coverPath);
                } else {
                    console.log('已经创建')
                }
                coverUrl = `${baseUrl}${title}/${title}.jpg`;
            }

            // // 使用create方法直接保存到数据库
            const music = await Music.findOne({title});
            if (music) {
                console.log('已经存在')
                continue;
            }
            await Music.create({
                title,
                artist: artistName,
                album: metadata.common.album || '无专辑',
                duration: metadata.format.duration,
                language: '6668312d46fde66802091cb8', // 替换成实际的语言ID
                cover: coverUrl || '暂无封面',
                audio: `${baseUrl}${title}/${title}.mp3`,
                lyric: `${baseUrl}${title}/${title}.lrc`
            })
        }
    }
}

processFiles()
    .then(() => {
        console.log('All files processed successfully');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error processing files:', err);
        mongoose.connection.close();
    });
