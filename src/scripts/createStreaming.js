import "babel-polyfill";

(async () => {
    const newStreaming = new FormData();
    const hostname = 'localhost:5000';

    let videoTypeVal = undefined, videoTypeName, streamingStatusVal;
    let isValidInput = true;

    // utils
    const createNewMatchBtn = document.querySelector('#create-new-match-btn');
    const genKeyBtn = document.querySelector('#btn-generate-key');
    const reloadVideoSrc = document.querySelector('#reload-video-source');

    // general streaming data
    const streamingKey = document.querySelector('#streaming-key');
    const streamingLiveUrl = document.querySelector('#streaming-live-url');
    const inputVideoType = document.querySelector('#input-video-type');
    const inputVideoTitle = document.querySelector('#input-video-title');
    const inputVideoStatus = document.querySelector('#input-video-status');
    const inputVideoTime = document.querySelector('#input-video-time');
    const inputVideoTournament = document.querySelector('#input-video-tournament');

    // football
    const inputTeam1Name = document.querySelector('#input-video-team1-name');
    const inputTeam1Logo = document.querySelector('#input-video-team1-logo')
    const inputTeam2Name = document.querySelector('#input-video-team2-name');
    const inputTeam2Logo = document.querySelector('#input-video-team2-logo')

    // tennis

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
                url: `http://${hostname}/api/sport-types`
            })

            return streamingTypes.data;
        } catch (error) {
            return error.response;;
        }
    }

    const renderStreamingTypes = (data) => {
        let output = '<option value="undefined">Choose sport type</option>';

        data.forEach(object => {
            output += `
                <option value="${object._id}">${object.name}</option>            
            `;            
        })

        inputVideoType.innerHTML = output;
    }
    
    const streamingTypes = await getStreamingTypes();
    renderStreamingTypes(streamingTypes.data.sportTypes);

    uploadStreamingType.addEventListener('change', event => {        
    
        const selectedIndex = event.target.selectedIndex;
        const options = document.querySelectorAll('#input-video-type option');
        videoTypeVal = options[selectedIndex].value;
        videoTypeName = options[selectedIndex].innerText;
    
        if (options[selectedIndex].textContent === 'football') {
            uploadFootballTeams.style.display = 'flex';
            uploadTennisPlayers.style.display = 'none';
            uploadTournamentLogo.style.display = 'none';
        } else if (options[selectedIndex].textContent === 'Tennis') {
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
        streamingStatusVal = options[selectedIndex].value;
    
        if (options[selectedIndex].textContent === 'Schedule') {
            inputVideoTimeContainer.style.display = 'block';
            inputVideoTime.removeAttribute('disabled');
        } else {
            inputVideoTimeContainer.style.display = 'none';
            inputVideoTime.setAttribute('disabled', 'disabled');
        }
    })    
    
    genKeyBtn.addEventListener('click', (event) => {
        event.preventDefault();            
    
        streamingKey.removeAttribute('disabled');
        streamingLiveUrl.removeAttribute('disabled');
        createNewMatchBtn.removeAttribute('disabled');
    
        const currentTimeInUnix = new Date().getTime();
        const streamingServer = 'http://192.168.1.101';
        streamingKey.value = currentTimeInUnix;
        streamingLiveUrl.value = `${streamingServer}/${currentTimeInUnix}`;
    })
    

    reloadVideoSrc.addEventListener('click', event => {
        event.preventDefault();
    })
        
    createNewMatchBtn.addEventListener('click', async () => {
        const videoTitleVal = inputVideoTitle.value ? inputVideoTitle.value : undefined;
        const videoTournamentVal = inputVideoTournament.value ? inputVideoTournament.value : undefined;                
        
        newStreaming.append('title', videoTitleVal);
        newStreaming.append('type', videoTypeVal);
        newStreaming.append('tournament', videoTournamentVal);
        newStreaming.append('status', parseInt(streamingStatusVal));
        newStreaming.append('streamingUrl', streamingLiveUrl.value);
    
        // if (newStreaming.streamingStatus == 0) {
        //     const currentDatetime = new Date().toISOString();
        //     const formatDatetime = currentDatetime.slice(0, currentDatetime.length-1);
        //     const timeEl = document.querySelector('#input-video-time');
            
        //     timeEl.value = formatDatetime;
        // } 
        
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
    
        if (!parseInt(streamingStatusVal)) {
            isValidInputValidator(inputVideoStatus, false);
        } else {
            isValidInputValidator(inputVideoStatus, true);
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
                            
            newStreaming.append('fc1', team1NameVal);
            newStreaming.append('fc1Img', team1LogoVal);
            newStreaming.append('fc2', team2NameVal);
            newStreaming.append('fc2Img', team2LogoVal);
        } else if (newStreaming.type === 'tennis') {
    
        }
        
        if (isValidInput) {
            try {
                const createNewMatchResponse = await axios({
                    method: 'post',
                    url: `http://${hostname}/api/matches`,
                    config: {
                        headers: { 
                            'Content-Type': 'multipart/form-data' 
                        }
                    },
                    data: newStreaming
                })
                console.log(createNewMatchResponse);
            } catch(error) {
                console.log(error.response);
            }
            console.log(newStreaming);
        } else {
            alert('Invalid input');
        }
    })
})();
