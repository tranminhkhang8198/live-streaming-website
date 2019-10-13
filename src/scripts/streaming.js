const getStreamingKey = localStorage.getItem('key');
let source = `http://45.63.62.153:3002/live/${getStreamingKey}/index.m3u8`;

const video = document.querySelector('.video-streaming');

if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(source);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
    });
}
// hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
// When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element through the `src` property.
// This is using the built-in support of the plain video element, without using hls.js.
// Note: it would be more normal to wait on the 'canplay' event below however on Safari (where you are most likely to find built-in HLS support) the video.src URL must be on the user-driven
// white-list before a 'canplay' event will be emitted; the last video event that can be reliably listened-for when the URL is not on the white-list is 'loadedmetadata'.
else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
    video.addEventListener('loadedmetadata', function () {
        video.play();
    });
}

// if (video.src) {
//     const videoFound = document.querySelector('.video-not-found');
//     videoFound.setAttribute('style', 'display: none !important');
//     videoFound.classList.remove('d-flex', 'flex-column');
// } else {
//     const videoFound = document.querySelector('.video-not-found');
//     videoFound.setAttribute('style', 'display: flex');
//     videoFound.classList.add('d-flex', 'flex-column');
// }