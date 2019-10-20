const uploadStreamingType = document.querySelector('.upload-streaming-title-type');
uploadStreamingType.addEventListener('change', event => {
    const uploadFootballTeams = document.querySelector('.upload-streaming-team1-team2');
    const uploadTennisPlayers = document.querySelector('.upload-streaming-player1-player2');
    const uploadTournamentLogo = document.querySelector('.upload-video-tournament-logo');

    const selectedIndex = event.target.selectedIndex;

    const options = document.querySelectorAll('#input-video-type option');

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
const inputVideoTimeContainer = document.querySelector('#input-video-time-container');
const inputVideoTime = document.querySelector('#input-video-time');

inputVideoStatus.addEventListener('change', (event) => {    
    const selectedIndex = event.target.selectedIndex;

    const options = document.querySelectorAll('#input-video-status option');
    
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

    const streamingKey = document.querySelector('#streaming-key');
    const streamingLiveUrl = document.querySelector('#streaming-live-url');
    const streamingBackupUrl = document.querySelector('#streaming-backup-url');

    streamingKey.removeAttribute('disabled');
    streamingLiveUrl.removeAttribute('disabled');
    streamingBackupUrl.removeAttribute('disabled');
})


const reloadVideoSrc = document.querySelector('#reload-video-source');
reloadVideoSrc.addEventListener('click', event => {
    event.preventDefault();    
})