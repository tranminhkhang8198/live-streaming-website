const getStreamingKey = localStorage.getItem('key');
const source = `http://f82f3403.ngrok.io/live/loi/index.m3u8`;
const servers = Array.from(document.querySelectorAll('.server-bt'))


const video = document.querySelector('.streamVideo');
// const liveBT = document.querySelector('.live')
// liveBT.addEventListener("click",function(){
//     duration = video.duration
//     video.currentTime = duration-5
// })

servers[0].dataset.source =`http://f82f3403.ngrok.io/live/loi/index.m3u8`
servers[1].dataset.source =`http://f82f3403.ngrok.io/live/khang/index.m3u8`


for (var i=0, max=servers.length; i < max; i++) {
    // Do something with the element here
    servers[i].addEventListener("click",function(){
        const a = this.dataset.source
        removeClass("active")
        this.classList.add("active")
        loadHLS(a)
    })

};



loadHLS(source)

function getStreamingURL(){
    
}

function removeClass(classname){
    console.log(servers)
    for (var i=0, max=servers.length; i < max; i++) {
        servers[i].classList.remove(classname)
    }
}

function loadHLS(source){
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
}
