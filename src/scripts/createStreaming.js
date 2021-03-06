import "babel-polyfill";
import moment from "moment";

import axios from "axios";


(async () => {
    const newStreaming = new FormData();    

    const getConfigFile = async () => {
        try {
            const responseData = await axios({
                method: 'get',
                // url: `http://${hostname}/config`
                url: `/config`
            })
            return responseData;
        } catch (error) {
            return error.response;;
        }                
    }
    const gconfig = await getConfigFile();

    // const streamingHostname = 'localhost';
    let streamingHostnameIp = gconfig.data.ip;
    let streamingHostnameDomain = gconfig.data.domain;

    let videoTypeVal = undefined, videoTypeName, streamingStatusVal = 1;
    let isValidInput = true;

    // utils
    const createNewMatchBtn = document.querySelector('#create-new-match-btn');
    const addMoreUrlBtn = document.querySelector('#add-more-streaming-url-btn');
    const genKeyBtn = document.querySelector('#btn-generate-key');
    const reloadVideoSrc = document.querySelector('#reload-video-source');

    // general streaming data
    const streamingHostname = document.querySelector('#streaming-host-name');
    const streamingKey = document.querySelector('#streaming-key');
    const streamingLiveUrl = document.querySelector('#streaming-live-url');
    const streamingServerUrl = document.querySelector('#streaming-url');
    const inputVideoType = document.querySelector('#input-video-type');
    const inputVideoTitle = document.querySelector('#input-video-title');
    const inputVideoStatus = document.querySelector('#input-video-status');
    const inputVideoTime = document.querySelector('#input-video-time');
    const inputVideoTournament = document.querySelector('#input-video-tournament');

    // football
    const inputTeam1Name = document.querySelector('#input-video-team1-name');
    const inputTeam1Logo = document.querySelector('#input-video-team1-logo')
    const inputTeam2Name = document.querySelector('#input-video-team2-name');
    const inputTeam2Logo = document.querySelector('#input-video-team2-logo');
    
    // tennis
    const inputPlayer1Name = document.querySelector('#input-video-player1-name');
    const inputPlayer2Name = document.querySelector('#input-video-player2-name');
    const inputVideoTournamentLogo = document.querySelector('#input-video-tournament-logo');

    // containers
    const inputVideoTimeContainer = document.querySelector('#input-video-time-container');
    const uploadStreamingType = document.querySelector('.upload-streaming-title-type');
    const uploadFootballTeams = document.querySelector('.upload-streaming-team1-team2');
    const uploadTennisPlayers = document.querySelector('.upload-streaming-player1-player2');
    const uploadTournamentLogo = document.querySelector('.upload-video-tournament-logo');

    const isValidInputValidator = (selector, isValid) => {    
        selector.classList.remove('is-invalid');    
        
        if (!isValid) {
            selector.classList.add('is-invalid');
            isValidInput = false;        
        }
        else {
            selector.classList.remove('is-invalid');
        }        
        if(!Array.from(document.querySelectorAll('.is-invalid')).length) {
            isValidInput = true;
        }
    }

    const getStreamingTypes = async () => {
        try {
            const streamingTypes = await axios({
                method: 'get',
                // url: `http://${hostname}/api/sport-types`
                url: `/api/sport-types`
            })

            return streamingTypes.data;
        } catch (error) {
            return error.response;
        }
    }

    const renderStreamingTypes = (data) => {
        let output = '<option value="undefined">Choose sport type</option>';

        data.forEach(type => {
            output += `
                <option value="${type._id}">${type.name}</option>            
            `;            
        })

        inputVideoType.innerHTML = output;
    }
    
    const streamingVideo = (baseSource) => {
        const video = document.querySelector('.video');
        
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
    }
    
    const streamingTypes = await getStreamingTypes();
    renderStreamingTypes(streamingTypes.sportTypes);

    addMoreUrlBtn.addEventListener('click', event => {
        event.preventDefault();
        
        const newInput = document.createElement('input');
        newInput.setAttribute('type', 'text');
        newInput.classList.add('streaming-live-urls' ,'mb-1' ,'form-control');
        document.querySelector('.url-inputs-container').appendChild(newInput);
    })

    uploadStreamingType.addEventListener('change', event => {
        const selectedIndex = event.target.selectedIndex;
        const options = document.querySelectorAll('#input-video-type option');
        videoTypeVal = options[selectedIndex].value;
        videoTypeName = options[selectedIndex].innerText;
    
        if (options[selectedIndex].textContent === 'football') {
            uploadFootballTeams.style.display = 'flex';
            uploadTennisPlayers.style.display = 'none';
            uploadTournamentLogo.style.display = 'none';
        } else if (options[selectedIndex].textContent === 'tennis') {
            uploadTennisPlayers.style.display = 'flex';
            uploadTournamentLogo.style.display = 'block';
            uploadFootballTeams.style.display = 'none';
        } else {
            uploadTennisPlayers.style.display = 'none';
            uploadFootballTeams.style.display = 'none';
            uploadTournamentLogo.style.display = 'none';
        }                
    })
    
    inputVideoStatus.addEventListener('change', (event) => {
        const selectedIndex = event.target.selectedIndex;
    
        const options = document.querySelectorAll('#input-video-status option');
        streamingStatusVal = parseInt(options[selectedIndex].value);                
    
        if (streamingStatusVal == 0) {
            inputVideoTimeContainer.style.display = 'block';
            inputVideoTime.removeAttribute('disabled');

            const currentTimePlus15Mins = moment().add(15, 'minutes').format('YYYY-MM-DDTHH:mm');
            inputVideoTime.value = currentTimePlus15Mins;
        } else {
            inputVideoTimeContainer.style.display = 'none';
            inputVideoTime.setAttribute('disabled', 'disabled');
        }

        console.log({streamingStatusVal})
    })    
    
    genKeyBtn.addEventListener('click', (event) => {
        event.preventDefault();            

        const currentTimeInUnix = new Date().getTime();

        streamingKey.value = currentTimeInUnix;
        streamingHostname.value = streamingHostnameDomain;
        streamingServerUrl.value = `rtmp://${streamingHostnameDomain}/live`;
        streamingLiveUrl.value = `https://${streamingHostnameDomain}/live/${currentTimeInUnix}/index.m3u8`;
    
        streamingKey.removeAttribute('disabled');
        streamingHostname.removeAttribute('disabled');
        createNewMatchBtn.removeAttribute('disabled');
        addMoreUrlBtn.removeAttribute('disabled');

        streamingKey.addEventListener('keyup', function(event) {
            streamingLiveUrl.value = `https://${streamingHostname.value}/live/${this.value}/index.m3u8`;
        })

        streamingHostname.addEventListener('keyup', function(event) {
            streamingLiveUrl.value = `https://${this.value}/live/${streamingKey.value}/index.m3u8`;
            streamingServerUrl.value = `rtmp://${this.value}/live`;
        })            
    })

    reloadVideoSrc.addEventListener('click', event => {
        event.preventDefault();

        const streamingVideoKey = streamingKey.value;
        
        const baseSource = `https://${streamingHostnameDomain}/live/${streamingVideoKey}/index.m3u8`;
        streamingVideo(baseSource);
    })
        
    createNewMatchBtn.addEventListener('click', async () => {
        const videoTitleVal = inputVideoTitle.value ? inputVideoTitle.value : undefined;
        const videoTournamentVal = inputVideoTournament.value ? inputVideoTournament.value : undefined;

        const streamingUrlsElements = document.querySelectorAll('.streaming-live-urls');
        const urlsValues = [];
        streamingUrlsElements.forEach(el => {
            urlsValues.push(el.value);
        })        
                        
        newStreaming.set('streamingTitle', videoTitleVal);
        newStreaming.set('type', videoTypeVal);        
        newStreaming.set('tournament', videoTournamentVal);
        (streamingStatusVal === 0) 
            ? newStreaming.set('status', false)
            : newStreaming.set('status', true);
        newStreaming.set('streamingUrl', urlsValues);
    
        
        if (streamingStatusVal == 0) {
            const currentTimePlus15Mins = moment().add(15, 'minutes').format();            
            const timeValue = moment(inputVideoTime.value).format();
            newStreaming.set('time', timeValue);
        } else if (streamingStatusVal == 1){
            const currentTime = moment().zone('+0700').format();
            newStreaming.set('time', currentTime);
        }
        debugger;
        
        if (!videoTypeVal) {
            isValidInputValidator(inputVideoType, false);        
        } else {
            isValidInputValidator(inputVideoType, true);
        }
    
        if (!videoTitleVal) {
            isValidInputValidator(inputVideoTitle, false);
        } else {
            isValidInputValidator(inputVideoTitle, true);
        }
        
        if (!videoTournamentVal) {
            isValidInputValidator(inputVideoTournament, false);
        } else {
            isValidInputValidator(inputVideoTournament, true);
        }
    
        if (videoTypeName === 'football') {
            const team1NameVal = inputTeam1Name.value ? inputTeam1Name.value : undefined;
            const team1LogoVal = inputTeam1Logo.files[0] ? inputTeam1Logo.files[0] : undefined;
            const team2NameVal = inputTeam2Name.value ? inputTeam2Name.value : undefined;
            const team2LogoVal = inputTeam2Logo.files[0] ? inputTeam2Logo.files[0] : undefined;
    
            if (!team1NameVal) {
                isValidInputValidator(inputTeam1Name, false);
            } else {
                isValidInputValidator(inputTeam1Name, true);
            }
    
            if (!team2NameVal) {
                isValidInputValidator(inputTeam2Name, false);
            } else {
                isValidInputValidator(inputTeam2Name, true);
            }
                            
            newStreaming.set('fc1', team1NameVal);
            newStreaming.set('fc1Img', team1LogoVal);
            newStreaming.set('fc2', team2NameVal);
            newStreaming.set('fc2Img', team2LogoVal);
        } else if (videoTypeName === 'tennis') {
            const player1NameVal = inputPlayer1Name.value ? inputPlayer1Name.value : undefined;
            const player2NameVal = inputPlayer2Name.value ? inputPlayer2Name.value : undefined;            
            const tournamentLogoVal =  inputVideoTournamentLogo.files[0] ? inputVideoTournamentLogo.files[0] : undefined;
            
            if (!player1NameVal) {
                isValidInputValidator(inputPlayer1Name, false);
            } else {
                isValidInputValidator(inputPlayer1Name, true);
            }
    
            if (!player2NameVal) {
                isValidInputValidator(inputPlayer2Name, false);
            } else {
                isValidInputValidator(inputPlayer2Name, true);
            }
                        
            newStreaming.set('tournamentImg', tournamentLogoVal);
            newStreaming.set('fc1', player1NameVal);
            newStreaming.set('fc2', player2NameVal);
        }
        
        if (isValidInput) {
            try {
                const createNewMatchResponse = await axios({
                    method: 'post',
                    // url: `http://${hostname}/api/matches`,
                    url: `/api/matches`,
                    config: {
                        headers: { 
                            'Content-Type': 'multipart/form-data' 
                        }
                    },
                    data: newStreaming
                });
                window.alert('Successful to create new streaming');
                // window.location = '/admin';
            } catch(error) {                
                window.alert('Failed to create new streaming');
            }            
        } else {
            alert('Invalid input');
        }
    })
})();
