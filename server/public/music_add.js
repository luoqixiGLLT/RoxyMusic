import fs from 'fs';
import { parseFile } from 'music-metadata';
import path from 'path';
import { Music } from '../models/index.js';
import mongoose from 'mongoose';

// 音乐文件夹路径
const musicFolderPath = './music';

// 读取音乐文件夹中的文件夹
fs.readdir(musicFolderPath, async (err, files) => {
    if (err) {
        console.error('读取文件夹失败：', err);
        return;
    }

    // 记录添加完成的音乐数量
    let addedCount = 0;
    const totalCount = files.length;

    // 遍历每个文件夹
    for (const folder of files) {
        const folderPath = path.join(musicFolderPath, folder);

        // 检查文件夹是否存在
        if (fs.existsSync(folderPath) && fs.lstatSync(folderPath).isDirectory()) {
            const musicFiles = fs.readdirSync(folderPath);

            // 检查是否存在音频文件
            const audioFile = musicFiles.find(file => file.endsWith('.mp3'));
            if (!audioFile) {
                console.log(`文件夹 ${folder} 缺少音频文件，跳过添加。`);
                continue;
            }

            // 获取音频文件的元数据
            const audioMetadata = await parseFile(path.join(folderPath, audioFile));

            // 提取封面并保存到当前歌曲文件夹下
            const coverData = audioMetadata.common.picture;
            if (coverData && coverData.length > 0) {
                const coverBuffer = coverData[0].data;
                const coverFileName = `${folder}.jpg`;
                const coverFilePath = path.join(folderPath, coverFileName);
                fs.writeFileSync(coverFilePath, coverBuffer);
            }

            // 填充封面和歌词信息
            const coverUrl = fs.existsSync(path.join(folderPath, `${folder}.jpg`)) ?
                `http://localhost:3243/music/${folder}/${folder}.jpg` : 'http://localhost:3243/music/default.jpg';
            const lyricUrl = musicFiles.includes(`${folder}.lrc`) ?
                `http://localhost:3243/music/${folder}/${folder}.lrc` : 'http://localhost:3243/music/default.lrc';

            // 检查数据库中是否已存在相同歌曲名的音乐
            const existingMusic = await Music.findOne({ title: folder });
            if (existingMusic) {
                // console.log(`${folder} 已存在于数据库中，跳过添加。`);
                continue;
            }

            // 创建新的音乐对象
            const newMusic = new Music({
                title: folder,
                artist: audioMetadata.common.artist || '未知歌手',
                album: audioMetadata.common.album || '未知专辑',
                duration: Math.round(audioMetadata.format.duration),
                language: '6669877dafe0839bf38f8cb8', // 假设这里是语言的 ObjectId
                cover: coverUrl,
                audio: `http://localhost:3243/music/${folder}/${folder}.mp3`,
                lyric: lyricUrl,
            });

            // 保存音乐到数据库
            try {
                await newMusic.save();
                addedCount++;
                console.log(`${folder} 添加成功！`);
            } catch (err) {
                console.error(`${folder} 添加失败：`, err);
            }
        }
    }
    await mongoose.disconnect();
    console.log('添加完毕，结束')
});
