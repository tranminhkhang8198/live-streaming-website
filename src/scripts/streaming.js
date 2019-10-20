const getStreamingKey = localStorage.getItem('key');
const source = `http://127.0.0.1:3002/live/loi/index.m3u8`;

const video = document.querySelector('.streamVideo');
// const liveBT = document.querySelector('.live')
// liveBT.addEventListener("click",function(){
//     duration = video.duration
//     video.currentTime = duration-5
// })

if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(source);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
    });
}
else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
    video.addEventListener('loadedmetadata', function () {
        video.play();
    });
}