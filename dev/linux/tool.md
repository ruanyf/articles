# Linux的应用工具

## PdfTk

PdfTk用于修改PDF文件。

```bash
# 合并两个PDF
$ pdftk input1.pdf input2.pdf cat output output.pdf
```

## ffmpeg

ffmpeg用于音频和视频的操作。

```bash
# 查看多媒体文件信息
$ ffprobe <inputFile>

# 切割出一个片段
$ ffmpeg -ss <startTime #00:00:50> -i example -t <length #00:00:20> -vcodec copy -acodec copy tos.mkv

# 转换格式
$ ffmpeg -i tos.mkv tos.mp4
$ ffmpeg -i tos-audio.aac tos-audio.mp3

# 拷贝视频文件的音轨
$ ffmpeg -i tos.mkv -vn -acodec copy tos-audio.aac
# 拷贝并转换视频文件的音轨
$ ffmpeg -i tos.mkv -vn -acodec mp3 -ab 64k tos-audio-lo.mp3

# 录制屏幕
$ ffmpeg -f x11grab -r 10 -s 1600x900 -i :0.0+0,0 -vcodec libx264 -preset ultrafast -crf 0 screen.mp4
```

- -f x11grab indicates to take the input from the X11 display (i.e. the screen on Linux)
- -r 10 is the frame rate (generally in my lectures there is little motion, so a low frame rate is ok)
- -s 1600x900 is the resolution of the screen
- -i :0.0 indicates the display number (should not need to change this)
- +0,0 is the offset from the top-left of the screen to record (this will be used later)
- -vcodec libx264 specifics to use x264 to encode to H.264 codec
- -preset ultrafast -crf 0 are options for the x264 codec
- screen.mp4 is the output file

## Sox

SoX用于从麦克风录制音频。

```bash
# 44.1kHz抽样，录制16位音频成FLAC格式
$ rec -r 44100 -b 16 -c 1 audio.flac
```

## Combining Audio and Screen Files

After using screencast to record the audio and screen into separate files, we need to combine (multiplex) them into a single file. I will do it in three steps.

First convert the FLAC audio to WAV:

```
$ flac -d test-audio.flac
```

Second convert the WAV audio to AAC:

```
$ faac -b 64 test-audio.wav
```

Finally combine the audio (AAC) and screen (MP4) to produce an MP4 video:

```
$ ffmpeg -i test-screen.mp4 -i test-audio.aac -absf aac_adtstoasc -vcodec copy -acodec copy test-video.mp4
```


