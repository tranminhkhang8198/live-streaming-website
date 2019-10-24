import "babel-polyfill";
import axios from 'axios';
import { directive } from "babel-types";

(async () => {
    window.VIDEOJS_NO_DYNAMIC_STYLE = true

    var options = {
        html5: {
            hlsjsConfig: {
            // Put your hls.js config here
            }
        }
    };

    // setup beforeinitialize hook
    videojs.Html5Hlsjs.addHook('beforeinitialize', (videojsPlayer, hlsjsInstance) => {
        // here you can interact with hls.js instance and/or video.js playback is initialized
    });

    var player = videojs('video-hls', options);
    // player.playsinline(true)
    ////


    player.on('pause', function() {
        this.bigPlayButton.show();
    
        // Now the issue is that we need to hide it again if we start playing
        // So every time we do this, we can create a one-time listener for play events.
        player.on('play', function() {
        this.bigPlayButton.hide();
        });
    });

    // function renderServerSelection(){
        ///get source
        const myurl = document.location.href
        const matchID = extractUrlValue("id",myurl)
        const getServerURLs = async () => {
            try {
                const responseData = await axios({
                    method: 'get',
                    url: `http://127.0.0.1:5000/api/matches/${matchID}`
                })
                return responseData;
            } catch (error) {
                return error.response;;
            }                
        }
        const responseOj = await getServerURLs();    
        console.log(responseOj);
        const URLS = responseOj.data.response[0].streaming.streamingUrl;


        ///create UI
        const serverSelection = document.querySelector('.server-selection');
        if (URLS.length>1){
            const newEl = createServerElement(true,URLS[0])
            serverSelection.append(newEl)
            for(var i = 1,max=URLS.length;i<max;i++){
                const newEl = createServerElement(false,URLS[i])
                serverSelection.append(newEl)
            }
            loadHLS(URLS[0])
        }else if(URLS.length==1){
            const newEl = createServerElement(true,URLS[i])
            serverSelection.append(newEl)
            loadHLS(URLS[0])
        }
        



    ///
    // }
    ////-- init player

    // for (var i=0, max=servers.length; i < max; i++) {
    //     // Do something with the element here
    //     servers[i].addEventListener("click",function(){
    //         const a = this.dataset.source
    //         removeClass("active")
    //         this.classList.add("active")
    //         loadHLS(a)
    //     })

    // };

    
    // const video = videojs('stream-video');
    // const liveBT = document.querySelector('.live')
    // liveBT.addEventListener("click",function(){
    //     duration = video.duration
    //     video.currentTime = duration-5
    // })




    function extractUrlValue(key, url)
    {
        if (typeof(url) === 'undefined')
            url = window.location.href;
        var match = url.match('[?&]' + key + '=([^&]+)');
        return match ? match[1] : null;
    }



    function createServerElement(isactive,serverUrl){
        const serverContainer = document.createElement("div")
        serverContainer.classList.add("row","server","text-white")
        console.log(serverContainer)
        ///create server title element
        const serverTitle = document.createElement("div")
        serverTitle.classList.add("col-12","col-sm-3","fa","fa-server")
        serverTitle.innerHTML = "Server"

        ///create server-bt wrapper element
        const serverBtWrapper = document.createElement("div")
        serverBtWrapper.classList.add("col-12","col-sm-3")

        ///create server-bt container element
        const serverBtContainer = document.createElement("div")
        serverBtContainer.classList.add("server-bt-container","fa")

        ///create server bt element
        const serverBt = document.createElement("a")
        serverBt.classList.add("hvr-bounce-in","server-bt","fas","fa-play")
        serverBt.setAttribute('data-source',serverUrl)
        serverBt.addEventListener("click",function(){
            console.log(this.dataset.source)
            const a = this.dataset.source
            removeClass("active")
            this.classList.add("active")
            loadHLS(a)
        })
        if(isactive){
            serverBt.classList.add("active") 
        }
        serverBt.innerHTML = "HD 720p"

        serverBtContainer.append(serverBt)
        serverBtWrapper.append(serverBtContainer)
        serverContainer.append(serverTitle)
        serverContainer.append(serverBtWrapper)
        return serverContainer
    }


    function loadHLS(source){
        player.src({type: 'application/x-mpegURL', src: source});
        // if (player.canPlayType('application/x-mpegurl')){
            // video.addEventListener('loadedmetadata',function() {
                player.play();
            //   });
        // }
        // else{
            // player.play()

        // }
    }


    function removeClass(classname){
        const servers = document.querySelectorAll(".server-bt")
        for (var i=0, max=servers.length; i < max; i++) {
            servers[i].classList.remove(classname)
        }
    }
    // loadHLS(source, player)
})();
