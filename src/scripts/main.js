import 'babel-polyfill';
import axios from 'axios';
import moment from 'moment';

const hostname = `10.13.150.145:5000`;

const scheduleData = require('./data/fakeScheduleData.json');
const tennisData = require('./data/fakeTennisData.json');
const streamingData = require('./data/fakeStreamingData.json');

(async () => {
    const getFootballMatches = async () => {
        try {
            const matches = await axios({
                method: 'get',
                url: `http://${hostname}/api/matches`,
                params: {
                    type: 'football'
                }
            })

            return matches;
        } catch (error) {
            console.log(error.response);
        }
    }
    const getTennisMatches = async () => {
        try {
            const matches = await axios({
                method: 'get',
                url: `http://${hostname}/api/matches`,
                params: {
                    type: 'tennis'
                }
            })

            return matches;
        } catch (error) {
            console.log(error.response);
        }
    }
    
    const footballMatches = await getFootballMatches();
    const tennisMatches = await getTennisMatches();

    console.log({ footballMatches, tennisMatches });
    
    const innerFootballBlock = (data) => {        
        const { today, tommorow } = data;
        let todayFootballElOutput = `<h4 class="text-center">Today</h4>`;
        if (today) {
            today.forEach((data, index) => {                
                const time = moment(data.match.time).format('HH:mm');
                const date = moment(data.match.time).format('DD/MM/YYYY');

                if (data.match.streaming.status == false) {
                    todayFootballElOutput += `
                        <a class="row schedule-item-containers" href="/streaming?id=${data.match._id}">
                            <div class="col-5 col-sm-5 col-md-5 d-flex flex-row align-items-center justify-content-center schedule-item-left-content">
                                <img 
                                    class="rounded-circle img-responsive schedule-team-img" 
                                    src="../images/representative.jpg"/>
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
                                    class="rounded-circle img-responsive schedule-team-img" 
                                    src="${data.match.fc2ImgUrl}"/>
                            </div>
                        </a>
                    `;
                } else {
                    todayFootballElOutput += `
                        <a class="row schedule-item-containers" href="/streaming?id=${data.match._id}">
                            <div class="col-5 col-sm-5 col-md-5 d-flex flex-row align-items-center justify-content-center schedule-item-left-content">
                                <img 
                                    class="rounded-circle img-responsive schedule-team-img" 
                                    src="../images/representative.jpg"/>
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
                                    class="rounded-circle img-responsive schedule-team-img" 
                                    src="${data.match.fc2ImgUrl}"/>
                            </div>
                        </a>
                    `;
                }
                
            }); 
        }

        let tommorowFootballElOutput = '';
        if (tommorow) {
            tommorowFootballElOutput  += `<h4 class="text-center">Tommorow</h4>`;
            tommorow.forEach((data, index) => {
                const time = moment(data.match.time).format('HH:mm');
                const date = moment(data.match.time).format('DD/MM/YYYY');            

                if (data.match.streaming.status == false) {
                    tommorowFootballElOutput += `
                        <a class="row schedule-item-containers" href="/streaming?id=${data.match._id}">
                            <div class="col-5 col-sm-5 col-md-5 d-flex flex-row align-items-center justify-content-center schedule-item-left-content">
                                <img 
                                    class="rounded-circle img-responsive schedule-team-img" 
                                    src="../images/representative.jpg"/>
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
                                    class="rounded-circle img-responsive schedule-team-img" 
                                    src="${data.match.fc2ImgUrl}"/>
                            </div>
                        </a>
                    `;
                } else {
                    tommorowFootballElOutput += `
                        <a class="row schedule-item-containers" href="/streaming?id=${data.match._id}">
                            <div class="col-5 col-sm-5 col-md-5 d-flex flex-row align-items-center justify-content-center schedule-item-left-content">
                                <img 
                                    class="rounded-circle img-responsive schedule-team-img" 
                                    src="../images/representative.jpg"/>
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
                                    class="rounded-circle img-responsive schedule-team-img" 
                                    src="${data.match.fc2ImgUrl}"/>
                            </div>
                        </a>
                    `;
                }
            });
        }
        
        return { todayFootballElOutput, tommorowFootballElOutput };
    }
    const { todayFootballElOutput, tommorowFootballElOutput } = innerFootballBlock(footballMatches.data.response);
    const todayFootballEl = document.querySelector('.today-football-matches');
    const tommorowFootballEl = document.querySelector('.tommorow-football-matches');
    todayFootballEl.innerHTML = todayFootballElOutput;
    tommorowFootballEl.innerHTML = tommorowFootballElOutput;

    const innerTennisBlock = (data) => {
        const { today, tommorow } = data;
        let todayTennisElOutput = `<h4>Today</h4>`;                    

        if (today) {
            today.forEach((data, index) => {                
                const time = moment(data.match.time).format('HH:mm');
                const date = moment(data.match.time).format('DD/MM/YYYY');

                if (data.match.streaming.status == false) {
                    todayTennisElOutput += `
                        <a class="tennis_link" href="#">
                            <div class="tennis_layout row">
                                <div class="col-3 tennis_logo">
                                    <img src="${data.tournament.tournamentImgUrl}"/>
                                </div>
                                <div class="col-6 tennis_info text-center">
                                <h2 class="tennis_players_name">${data.match.fc1} vs ${data.match.fc2}</h2>
                                    <h3 class="tennis_tournament_name">${data.tournament.name}</h3>
                                </div>
                                <div class="col-3 play_button text-right">
                                    <p class="tennis_date">${time} ${date}</p>
                                </div>
                            </div>
                        </a>
                    `;
                } else {
                    todayTennisElOutput += `
                        <a class="tennis_link" href="#">
                            <div class="tennis_layout row">
                                <div class="col-3 tennis_logo">
                                    <img src="${data.tournament.tournamentImgUrl}"/>
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

        let tommorowTennisElOutput = '';
        if (tommorow) {
            tommorowTennisElOutput = `<h4>Tommorow</h4>`;
            tommorow.forEach((data, index) => {
                if (data.match.streaming.status == false) {
                    tommorowTennisElOutput += `
                        <a class="tennis_link" href="#">
                            <div class="tennis_layout row">
                                <div class="col-3 tennis_logo">
                                    <img src="${data.match}"/>
                                </div>
                                <div class="col-6 tennis_info text-center">
                                    <h2 class="tennis_players_name">${data.match.fc1} vs ${data.match.fc2}</h2>
                                    <h3 class="tennis_tournament_name">${data.tournament.name}</h3>
                                </div>
                                <div class="col-3 play_button text-right">
                                    <p class="tennis_date">${time} ${date}</p>
                                </div>
                            </div>
                        </a>
                    `;
                } else {
                    tommorowTennisElOutput += `
                        <a class="tennis_link" href="#">
                            <div class="tennis_layout row">
                                <div class="col-3 tennis_logo">
                                    <img src="${data.tournament.tournamentImgUrl}"/>
                                </div>
                                <div class="col-6 tennis_info text-center">
                                    <h2 class="tennis_players_name">${data.match.fc1} vs ${data.match.fc2}</h2>
                                    <h3 class="tennis_tournament_name">${data.match.tournament}</h3>
                                </div>
                                <div class="col-3 play_button">
                                    <div class="tennis_is_playing">
                                        <img src="'images/live-icon.png"/>
                                        <p class="tennis-time">LIVE</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    `;
                }
            });
        }        

        return { todayTennisElOutput, tommorowTennisElOutput }
    }    
    const { todayTennisElOutput, tommorowTennisElOutput } = innerTennisBlock(tennisMatches.data.response);    
    const todayTennisEl = document.querySelector('.today-tennis-matches');
    const tommorowTennisEl = document.querySelector('.tommorow-tennis-matches');
    todayTennisEl.innerHTML = todayTennisElOutput;
    tommorowTennisEl.innerHTML = tommorowTennisElOutput;

    const innerStreamingBlock = (data) => {
        const streamingContainer = document.querySelector('.streaming-container');
        let streamingOutput = `
            <h2 class="streaming-heading">Streaming</h2>
            <hr/>
        `;
            

        data.forEach(item => {
            streamingOutput += `
                <a class="row streaming-card-containers" href="${item.streaming_url}">
                    <div class="col-4 d-flex flex-row align-items-center streaming-card-title-container hvr-sweep-to-right"><i class="fas fa-tv mr-3"></i>
                        <h3 class="streaming-card-title">${item.tournament}</h3>
                    </div>
                    <div class="col-3 d-flex align-items-center justify-content-center text-center streaming-card-team-display">
                        <p class="streaming-card-team">${item.team1_name}</p>
                    </div>
                    <p class="col-2 d-flex align-items-center justify-content-center streaming-card-score-display">${item.score}</p>
                    <div class="col-3 d-flex align-items-center justify-content-center text-center streaming-card-team-display">
                        <p class="streaming-card-team">${item.team2_name}</p>
                    </div>
                    <div class="streaming-card-hidden">
                        <p class="streaming-card-team">${item.team1_name}</p>
                        <p class="streaming-card-score">${item.score}</p>
                        <p class="streaming-card-team">${item.team2_name} </p>
                    </div>
                </a>
            `;
        })
        streamingContainer.innerHTML = streamingOutput;
    }
    // innerStreamingBlock(streamingData);
})();