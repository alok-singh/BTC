// ffmpeg -i my-video.mov -vcodec h264 -acodec mp2 my-video.mp4

// convert .mov to .mp4
// ffmpeg -i videoName.mov -vcodec h264 -acodec mp2 videoName.mp4

// convert .mov to .webm
// ffmpeg -i videoName.mov -c:v libvpx -crf 10 -b:v 1M -c:a libvorbis videoName.webm

// convert .mov to .ogg
// ffmpeg -i videoName.mov -codec:v libtheora -qscale:v 7 -codec:a libvorbis -qscale:a 5 videoName.ogg