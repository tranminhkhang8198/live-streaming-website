import "babel-polyfill";
import axios from 'axios';
import { directive } from "babel-types";


(async () => {
    const fconfig = window.CONFIG
    const ApiHostName = fconfig.API_IP
    const ApiPort=fconfig.API_PORT
    window.VIDEOJS_NO_DYNAMIC_STYLE = true
    const title = document.querySelector(".title")
    var options = {
        html5: {
            hlsjsConfig: {
            // Put your hls.js config here
            },
            nativeAudioTracks:false,
            nativeVideoTracks:false,
            hls:{
                debug:true,
                overrideNative:true
            }
        },
        liveui: true
    };

    // setup beforeinitialize hook
    // videojs.Html5Hlsjs.addHook('beforeinitialize', (videojsPlayer, hlsjsInstance) => {
        // here you can interact with hls.js instance and/or video.js playback is initialized
    // });

    var player = videojs('video-hls', options);
    // player.playsinline(true)
    ////

    const bigPlayBt = player.bigPlayButton.el_
    bigPlayBt.style.zIndex = 2
    var adContainer = document.createElement("div")
    adContainer.classList.add("adInBigPlayBt")
    adContainer.style.zIndex = 1
    adContainer.style.backgroundColor="white"
    adContainer.addEventListener("click",function(){
        window.open("http://google.com")
    })
    player.el_.append(adContainer)



    player.on('pause', function() {
        adContainer.classList.remove("d-none")
        adContainer.classList.add("d-block")

        this.bigPlayButton.el_.classList.remove("d-none")

        this.bigPlayButton.el_.classList.add("d-block")

    });
    player.on('play', function() {
        adContainer.classList.remove("d-block")
        adContainer.classList.add("d-none")
        this.bigPlayButton.el_.classList.remove("d-block")
        this.bigPlayButton.el_.classList.add("d-none")
    });

    // function renderServerSelection(){
        ///get source
        const myurl = document.location.href
        const matchID = extractUrlValue("id",myurl)
        const getServerURLs = async () => {
            try {
                const responseData = await axios({
                    method: 'get',
                    // url: `http://${ApiHostName}:${ApiPort}/api/matches/${matchID}`
                    url: `/api/matches/${matchID}`
                })
                // console.log(responseData)
                return responseData;
            } catch (error) {
                return error.response;;
            }                
        }
        const responseOj = await getServerURLs();    
        const URLS = responseOj.data.response[0].streaming.streamingUrl;
        console.log(URLS)
        const FCTitle = (responseOj.data.response[0].fc1).toUpperCase()+" - "+(responseOj.data.response[0].fc2).toUpperCase();
        // const FCTitle = URLS //"Man City - Man United"
        title.innerHTML = FCTitle

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
            const newEl = createServerElement(true,URLS[0])
            serverSelection.append(newEl)
            loadHLS(URLS[0])
        }




    function extractUrlValue(key, url)
    {
        if (typeof(url) === 'undefined')
            url = window.location.href;
        var match = url.match('[?&]' + key + '=([^&]+)');
        return match ? match[1] : null;
    }



    function createServerElement(isactive,serverUrl){
        const serverContainer = document.createElement("div")
        serverContainer.classList.add("row","server","text-white","description-row")
        console.log(serverContainer)
        ///create server title element
        const serverTitle = document.createElement("div")
        serverTitle.classList.add("col-12","col-sm-3","fa","fa-server","p-0")
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

        var promise = player.play();
        if (promise) {
            //Older browsers may not return a promise, according to the MDN website
            promise.catch(function(error) { console.error(error); });
        }
    }


    function removeClass(classname){
        const servers = document.querySelectorAll(".server-bt")
        for (var i=0, max=servers.length; i < max; i++) {
            servers[i].classList.remove(classname)
        }
    }
    // loadHLS(source, player)
})();
