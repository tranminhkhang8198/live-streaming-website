const getStreamingKey = localStorage.getItem('key');
const source = `http://45.63.62.153:3002/live/${getStreamingKey}/index.m3u8`;

const video = document.querySelector('.video-streaming');

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