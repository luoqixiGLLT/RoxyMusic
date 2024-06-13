import os
import shutil


def move_music_files(music_dir):
    # 遍历音乐文件夹
    for filename in os.listdir(music_dir):
        if filename.endswith('.mp3') or filename.endswith('.lrc'):
            # 解析文件名
            base_name, extension = os.path.splitext(filename)
            song_title, artist = base_name.rsplit(' - ', 1)

            # 构建目标文件夹路径
            target_folder = os.path.join(music_dir, song_title)

            # 创建目标文件夹（如果不存在）
            if not os.path.exists(target_folder):
                os.makedirs(target_folder)

            # 源文件路径
            source_path = os.path.join(music_dir, filename)

            # 目标文件路径
            target_path = os.path.join(target_folder, f"{song_title}{extension}")

            # 移动文件
            shutil.move(source_path, target_path)


if __name__ == "__main__":
    move_music_files('./music')