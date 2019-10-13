const video = document.querySelector('.video');

const cloneObject = [{
        tournament: "Ngoai hang anh",
        team1: "Norwich City",
        team2: "Aston Villa",
        score: "1-5",
        startTime: "2019-10-12T16:00:00Z",
        streamingKey: "streaming1"
    },
    {
        tournament: "Ngoai hang anh",
        team1: "West Ham",
        team2: "Crystal Palace",
        score: "1-2",
        startTime: "2019-10-12T18:00:00Z",
        streamingKey: "streaming2"
    },
    {
        tournament: "Ngoai hang anh",
        team1: "Man City",
        team2: "Wolves",
        score: "0-2",
        startTime: "2019-10-12T17:00:00Z",
        streamingKey: "streaming3"
    }
];

const baseSource = 'http://45.63.62.153:3002/live/loi/index.m3u8';

if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(baseSource);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
    });
} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
    video.addEventListener('loadedmetadata', function () {
        video.play();
    });
}

if (video.src) {
    const videoFound = document.querySelector('.video-not-found');
    videoFound.setAttribute('style', 'display: none !important');
    videoFound.classList.remove('d-flex', 'flex-column');
} else {
    const videoFound = document.querySelector('.video-not-found');
    videoFound.setAttribute('style', 'display: flex');
    videoFound.classList.add('d-flex', 'flex-column');
}