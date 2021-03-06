import 'babel-polyfill';
import axios from 'axios';
import moment from 'moment';

(async () => {
    const getFootballMatches = async () => {
        try {
            const matches = await axios({
                method: 'get',
                // url: `http://${hostname}/api/matches`,
                url: `/api/matches`,
                params: {
                    type: 'football'
                }
            })

            return matches;
        } catch (error) {

        }
    }

    const getTennisMatches = async () => {
        try {
            const matches = await axios({
                method: 'get',
                // url: `http://${hostname}/api/matches`,
                url: `/api/matches`,
                params: {
                    type: 'tennis'
                }
            })

            return matches;
        } catch (error) {
            
        }
    }
    
    const footballMatches = await getFootballMatches();
    const tennisMatches = await getTennisMatches(); 

    const insertAdvertisement = ({ type, adSrc, adThumbnail }) => {
        if (type === 'horizontal') {
            return `
                <a rel="nofollow" href="${adSrc}" title="Advertisement" target="_blank">
                    <img class="advertisement" src="${adThumbnail}"/>
                </a>
            `
        }    
    }       

    const innerFootballBlock = (data) => {        
        const { today, tomorrow } = data;
        let todayFootballElOutput = '';
        if (today && today.length) {
            todayFootballElOutput = `<h4 class="text-center">Today</h4>`;
            today.forEach((data, index) => {                
                const time = moment(data.match.time).format('HH:mm');
                const date = moment(data.match.time).format('MMMM D');    

                if (data.match.streaming.status == false) {
                    todayFootballElOutput += `
                        <a class="row schedule-item-containers" href="/streaming?id=${data.match._id}">
                            <div class="col-5 col-sm-5 col-md-5 d-flex flex-row align-items-center justify-content-center schedule-item-left-content">
                                <img 
                                    class="img-responsive schedule-team-img" 
                                    src="${data.match.fc1ImgUrl}"/>
                                <div class="schedule-team-name-container schedule-team-name-container-1">
                                    <p class="schedule-team-name-content schedule-team-name-content-left">
                                        ${data.match.fc1}
                                    </p>
                                </div>
                            </div>
                            <div class="col-2 col-sm-2 col-md-2 col-xl-2 schedule-time-container d-flex flex-column justify-content-center align-items-center">
                                <p class="schedule-time">${time}</p>
                                <div class="schedule-date">${date}</div>
                            </div>
                            <div class="col-5 col-sm-5 col-md-5 d-flex flex-row align-items-center justify-content-center schedule-item-right-content">
                                <div class="schedule-team-name-container schedule-team-name-container-2">
                                    <p class="schedule-team-name-content schedule-team-name-content-right">
                                        ${data.match.fc2}
                                    </p>
                                </div>
                                <img 
                                    class="img-responsive schedule-team-img" 
                                    src="${data.match.fc2ImgUrl}"/>
                            </div>
                        </a>
                    `;
                } else {
                    todayFootballElOutput += `
                        <a class="row schedule-item-containers" href="/streaming?id=${data.match._id}">
                            <div class="col-5 col-sm-5 col-md-5 d-flex flex-row align-items-center justify-content-center schedule-item-left-content">
                                <img 
                                    class="img-responsive schedule-team-img" 
                                    src="${data.match.fc1ImgUrl}"/>
                                <div class="schedule-team-name-container schedule-team-name-container-1">
                                    <p class="schedule-team-name-content schedule-team-name-content-left">
                                        ${data.match.fc1}
                                    </p>
                                </div>
                            </div>
                            <div class="col-2 col-sm-2 col-md-2 col-xl-2 schedule-time-container d-flex flex-column justify-content-center align-items-center">
                                <img class="schedule-time-img hvr-bounce-in" src="/images/live-icon.png"/>
                                <strong class="schedule-time-img-live">Live</strong>
                            </div>
                            <div class="col-5 col-sm-5 col-md-5 d-flex flex-row align-items-center justify-content-center schedule-item-right-content">
                                <div class="schedule-team-name-container schedule-team-name-container-2">
                                    <p class="schedule-team-name-content schedule-team-name-content-right">
                                        ${data.match.fc2}
                                    </p>
                                </div>
                                <img 
                                    class="img-responsive schedule-team-img" 
                                    src="${data.match.fc2ImgUrl}"/>
                            </div>
                        </a>
                    `;
                }
                
                if (index !== 0 && index%3 === 0 ) {
                    todayFootballElOutput += insertAdvertisement({ 
                        type: 'horizontal' ,
                        adSrc: 'http://uniad.phimmoi.net/data/banner/1130.gif',
                        adThumbnail: 'http://uniad.phimmoi.net/data/banner/1130.gif'
                    });
                }
            }); 
        }

        let tomorrowFootballElOutput = '';
        if (tomorrow && tomorrow.length) {
            tomorrowFootballElOutput  += `<h4 class="text-center">Tomorrow</h4>`;
            tomorrow.forEach((data, index) => {
                const time = moment(data.match.time).format('HH:mm');
                const date = moment(data.match.time).format('MMMM D');

                if (data.match.streaming.status == false) {
                    tomorrowFootballElOutput += `
                        <a class="row schedule-item-containers" href="/streaming?id=${data.match._id}">
                            <div class="col-5 col-sm-5 col-md-5 d-flex flex-row align-items-center justify-content-center schedule-item-left-content">
                                <img 
                                    class="img-responsive schedule-team-img" 
                                    src="${data.match.fc1ImgUrl}"/>
                                <div class="schedule-team-name-container schedule-team-name-container-1">
                                    <p class="schedule-team-name-content schedule-team-name-content-left">
                                        ${data.match.fc1}
                                    </p>
                                </div>
                            </div>
                            <div class="col-2 col-sm-2 col-md-2 col-xl-2 schedule-time-container d-flex flex-column justify-content-center align-items-center">
                                <p class="schedule-time">${time}</p>
                                <div class="schedule-date">${date}</div>
                            </div>
                            <div class="col-5 col-sm-5 col-md-5 d-flex flex-row align-items-center justify-content-center schedule-item-right-content">
                                <div class="schedule-team-name-container schedule-team-name-container-2">
                                    <p class="schedule-team-name-content schedule-team-name-content-right">
                                        ${data.match.fc2}
                                    </p>
                                </div>
                                <img 
                                    class="img-responsive schedule-team-img" 
                                    src="${data.match.fc2ImgUrl}"/>
                            </div>
                        </a>
                    `;
                }

                if (index !== 0 && index%3 === 0 ) {
                    tomorrowFootballElOutput += insertAdvertisement({ 
                        type: 'horizontal',
                        adSrc: 'http://uniad.phimmoi.net/data/banner/1130.gif',
                        adThumbnail: 'http://uniad.phimmoi.net/data/banner/1130.gif'
                    });
                }
            });
        }        
        
        return { todayFootballElOutput, tomorrowFootballElOutput };
    }
    const { todayFootballElOutput, tomorrowFootballElOutput } = innerFootballBlock(footballMatches.data.response);
    const todayFootballEl = document.querySelector('.today-football-matches');
    const tomorrowFootballEl = document.querySelector('.tomorrow-football-matches');
    todayFootballEl.innerHTML = todayFootballElOutput;
    tomorrowFootballEl.innerHTML = tomorrowFootballElOutput;

    const innerTennisBlock = (data) => {
        const { today, tomorrow } = data;

        let todayTennisElOutput = '';
        if (today && today.length) {
            todayTennisElOutput = `<h4>Today</h4>`;
            today.forEach((data, index) => {                
                const time = moment(data.match.time).format('HH:mm');
                const date = moment(data.match.time).format('MMMM D');

                if (data.match.streaming.status == false) {
                    todayTennisElOutput += `
                        <a class="tennis_link" href="/streaming?id=${data.match._id}">
                            <div class="tennis_layout row">
                                <div class="col-3 tennis_logo">
                                    <img src="${data.tournament.tournamentImgUrl}"  alt=""/>
                                </div>
                                <div class="col-6 tennis_info text-center">
                                <h2 class="tennis_players_name">${data.match.fc1} vs ${data.match.fc2}</h2>
                                    <h3 class="tennis_tournament_name">${data.tournament.name}</h3>
                                </div>
                                <div class="col-3 play_button text-right">
                                    <p class="tennis_date">${time} - ${date}</p>
                                </div>
                            </div>
                        </a>
                    `;
                } else {
                    todayTennisElOutput += `
                        <a class="tennis_link" href="/streaming?id=${data.match._id}">
                            <div class="tennis_layout row">
                                <div class="col-3 tennis_logo">
                                    <img src="${data.tournament.tournamentImgUrl}"  alt=""/>
                                </div>
                                <div class="col-6 tennis_info text-center">
                                    <h2 class="tennis_players_name">${data.match.fc1} vs ${data.match.fc2}</h2>
                                    <h3 class="tennis_tournament_name">${data.tournament.name}</h3>
                                </div>
                                <div class="col-3 play_button">
                                    <div class="tennis_is_playing">
                                        <img src="images/live-icon.png"/>
                                        <p class="tennis-time">LIVE</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    `;
                }
            }); 
        }        

        let tomorrowTennisElOutput = '';
        if (tomorrow && tomorrow.length) {
            tomorrowTennisElOutput = `<h4>Tomorrow</h4>`;
            tomorrow.forEach((data, index) => {
                const time = moment(data.match.time).format('HH:mm');
                const date = moment(data.match.time).format('MMMM D');
                
                if (data.match.streaming.status == false) {
                    tomorrowTennisElOutput += `
                        <a class="tennis_link" href="#">
                            <div class="tennis_layout row">
                                <div class="col-3 tennis_logo">
                                    <img src="${data.tournament.tournamentImgUrl}"  alt=""/>
                                </div>
                                <div class="col-6 tennis_info text-center">
                                    <h2 class="tennis_players_name">${data.match.fc1} vs ${data.match.fc2}</h2>
                                    <h3 class="tennis_tournament_name">${data.tournament.name}</h3>
                                </div>
                                <div class="col-3 play_button text-right">
                                    <p class="tennis_date">${time} - ${date}</p>
                                </div>
                            </div>
                        </a>
                    `;
                }
            });
        }        

        return { todayTennisElOutput, tomorrowTennisElOutput }
    }    
    const { todayTennisElOutput, tomorrowTennisElOutput } = innerTennisBlock(tennisMatches.data.response);    
    const todayTennisEl = document.querySelector('.today-tennis-matches');
    const tomorrowTennisEl = document.querySelector('.tomorrow-tennis-matches');
    todayTennisEl.innerHTML = todayTennisElOutput;
    tomorrowTennisEl.innerHTML = tomorrowTennisElOutput;
        
    const getLiveStreamingMatches = function() {        
        const matches = [];
        [...arguments].forEach(item => {
            item.forEach(flatItem => {
                if (flatItem.match.streaming.status === true) {
                    matches.push(flatItem);               
                }
            })
        });
        return matches;
    }
    const liveStreamingMatches = getLiveStreamingMatches(
        footballMatches.data.response.today, 
        tennisMatches.data.response.today);
    
    const innerStreamingBlock = (data) => {
        let streamingOutput = '';
        data.forEach(item => {
            streamingOutput += `
                <a class="row streaming-card-containers" href="/streaming?id=${item.match._id}">
                    <div class="col-5 col-lg-4 d-flex flex-row align-items-center streaming-card-title-container hvr-sweep-to-right"><i class="fas fa-tv mr-1 mb-4"></i>
                        <h3 class="streaming-card-title">${item.tournament.name}</h3>
                    </div>
                    <div class="col-3 col-lg-3 d-flex align-items-center justify-content-center text-center streaming-card-team-display">
                        <p class="streaming-card-team">${item.match.fc1}</p>
                    </div>
                    <p class="col-1 col-lg-2 d-flex align-items-center justify-content-center streaming-card-score-display">
                        ${item.match.score}
                    </p>
                    <div class="col-3 col-lg-3 d-flex align-items-center justify-content-center text-center streaming-card-team-display">
                        <p class="streaming-card-team">${item.match.fc2}</p>
                    </div>
                </a>
            `;
        })

        return streamingOutput;
    }
    const streamingOutput = innerStreamingBlock(liveStreamingMatches);
    const streamingEl = document.querySelector('.streaming-videos-container');
    streamingEl.innerHTML = streamingOutput;
})();