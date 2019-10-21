import "babel-polyfill";

(async () => {
    let videoTypeVal = undefined, streamingStatusVal;
    let isValidInput = true;

    const streamingKey = document.querySelector('#streaming-key');
    const streamingLiveUrl = document.querySelector('#streaming-live-url');

    const uploadStreamingType = document.querySelector('.upload-streaming-title-type');

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
                url: 'http://192.168.3.152:3000/api/sport-types'
            })

            return streamingTypes;
        } catch (error) {
            return error.response;;
        }                
    }

    const streamingTypes = await getStreamingTypes();    
    console.log(streamingTypes);


    uploadStreamingType.addEventListener('change', event => {
        const uploadFootballTeams = document.querySelector('.upload-streaming-team1-team2');
        const uploadTennisPlayers = document.querySelector('.upload-streaming-player1-player2');
        const uploadTournamentLogo = document.querySelector('.upload-video-tournament-logo');
    
        const selectedIndex = event.target.selectedIndex;
        const options = document.querySelectorAll('#input-video-type option');
        videoTypeVal = options[selectedIndex].value;
    
        if (options[selectedIndex].textContent === 'Football') {
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
    
    const inputVideoStatus = document.querySelector('#input-video-status');
    const inputVideoTime = document.querySelector('#input-video-time');
    const inputVideoTimeContainer = document.querySelector('#input-video-time-container');
    
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
    
    const genKeyBtn = document.querySelector('#btn-generate-key');
    genKeyBtn.addEventListener('click', (event) => {
        event.preventDefault();
    
        const createNewMatchBtn = document.querySelector('#create-new-match-btn');
    
        streamingKey.removeAttribute('disabled');
        streamingLiveUrl.removeAttribute('disabled');
        createNewMatchBtn.removeAttribute('disabled');
    
        const currentTimeInUnix = new Date().getTime();
        const streamingServer = 'http://192.168.1.101';
        streamingKey.value = currentTimeInUnix;
        streamingLiveUrl.value = `${streamingServer}/${currentTimeInUnix}`;
    })
    
    const reloadVideoSrc = document.querySelector('#reload-video-source');
    reloadVideoSrc.addEventListener('click', event => {
        event.preventDefault();
    })
    
    const createNewMatchBtn = document.querySelector('#create-new-match-btn');
    createNewMatchBtn.addEventListener('click', async () => {
        const videoTitleVal = document.querySelector('#input-video-title').value ?
            document.querySelector('#input-video-title').value :
            undefined;
        const videoTournamentVal = document.querySelector('#input-video-tournament').value ?
            document.querySelector('#input-video-tournament').value :
            undefined;
    
    
        const newStreaming = {
            type: videoTypeVal,
            title: videoTitleVal,
            tournament: videoTournamentVal,
            status: parseInt(streamingStatusVal),
            streamingUrl: streamingLiveUrl.value,
        }
    
        // if (newStreaming.streamingStatus == 0) {
        //     const currentDatetime = new Date().toISOString();
        //     const formatDatetime = currentDatetime.slice(0, currentDatetime.length-1);
        //     const timeEl = document.querySelector('#input-video-time');
            
        //     timeEl.value = formatDatetime;
        // } 
    
        if (!newStreaming.type) {
            isValidInputValidator(document.querySelector('#input-video-type'), false);        
        } else {
            isValidInputValidator(document.querySelector('#input-video-type'), true);
        }
    
        if (!newStreaming.title) {
            isValidInputValidator(document.querySelector('#input-video-title'), false);
        } else {
            isValidInputValidator(document.querySelector('#input-video-title'), true);
        }
        
        if (!newStreaming.tournament) {
            isValidInputValidator(document.querySelector('#input-video-tournament'), false);
        } else {
            isValidInputValidator(document.querySelector('#input-video-tournament'), true);
        }
    
        if (!newStreaming.status) {
            isValidInputValidator(document.querySelector('#input-video-status'), false);
        } else {
            isValidInputValidator(document.querySelector('#input-video-status'), true);
        }
    
        if (newStreaming.type === 'football') {
            const team1NameVal = document.querySelector('#input-video-team1-name').value ?
                document.querySelector('#input-video-team1-name').value :
                undefined;
            const team2NameVal = document.querySelector('#input-video-team2-name').value ?
                document.querySelector('#input-video-team2-name').value :
                undefined;
            const team1LogoVal = document.querySelector('#input-video-team1-logo').value ?
                document.querySelector('#input-video-team1-logo').value :
                undefined;
            const team2LogoVal = document.querySelector('#input-video-team2-logo').value ?
                document.querySelector('#input-video-team2-logo').value :
                undefined;
    
            if (!team1NameVal) {
                isValidInputValidator(document.querySelector('#input-video-team1-name'), false);
            } else {
                isValidInputValidator(document.querySelector('#input-video-team1-name'), true);
            }
    
            if (!team2NameVal) {
                isValidInputValidator(document.querySelector('#input-video-team2-name'), false);
            } else {
                isValidInputValidator(document.querySelector('#input-video-team2-name'), true);
            }
    
            newStreaming.fc1 = team1NameVal;
            newStreaming.fc2 = team2NameVal;
            newStreaming.fc1Img = team1LogoVal;
            newStreaming.fc2Img = team2LogoVal;
        } else if (newStreaming.type === 'tennis') {
    
        }
        
        if (isValidInput) {
            try {
                const createNewMatchResponse = await axios({
                    method: 'post',
                    url: 'http://192.168.3.152:3000/api/matches',
                    data: newStreaming
                })
                console.log(createNewMatchResponse);
            } catch(error) {
                console.log(error.response);
            }        
        } else {
            alert('Invalid input');
        }
    })
})();
