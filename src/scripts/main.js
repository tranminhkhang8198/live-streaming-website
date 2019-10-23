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
        console.log({ today, tommorow });

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

        let tommorowFootbalElOutput = '';
        if (tommorow) {
            tommorowFootbalElOutput  += `<h4 class="text-center">Tommorow</h4>`;
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
        
        return { todayFootballElOutput, tommorowFootbalElOutput };
    }
    const { todayFootballElOutput, tommorowFootbalElOutput } = innerFootballBlock(footballMatches.data.response);
    const todayFootballEl = document.querySelector('.today-football-matches');
    const tommorowFootballEl = document.querySelector('.tommorow-football-matches');
    todayFootballEl.innerHTML = todayFootballElOutput;
    tommorowFootballEl.innerHTML = tommorowFootbalElOutput;

    const innerTennisBlock = (data) => {
        const tennisContainer = document.querySelector('.tennis-container');    

        let outputTennis = `
            <span class="ml-2 sport-title sport-type">TENNIS</span>
            <div class="schedule-divider mt-4">
                <h4>Today</h4>        
        `;
            
        data.forEach((match, index) => {
            if (match.is_streaming == true) {
                outputTennis += `
                    <a class="custom_match_link" href="${match.streaming_url}">
                        <div class="custom_match_layout row">
                            <div class="col-3 custom_image">
                                <img src="${match.tournament_logo}"/>
                            </div>
                            <div class="col-6 custom_match_info text-center">
                                <h2 class="custom_name">${match.player1_name} vs ${match.player2_name}</h2>
                                <h3 class="custom_tournament_name">${match.tournament}</h3>
                            </div>
                            <div class="col-3 custom_play_botton">
                                <div class="match_is_playing">
                                    <img src="../images/live-icon.png"/>
                                    <p style="text-align: center;">LIVE</p>
                                </div>
                            </div>
                        </div>
                    </a>
                `;
            } else {
                outputTennis += `
                    <a class="custom_match_link" href="${match.streaming_url}">
                        <div class="custom_match_layout row">
                            <div class="col-3 custom_image">
                                <img src="${match.tournament_logo}"/>
                            </div>
                            <div class="col-6 custom_match_info text-center">
                                <h2 class="custom_name">${match.player1_name} vs ${match.player2_name}</h2>
                                <h3 class="custom_tournament_name">${match.tournament}</h3>
                            </div>
                            <div class="col-3 custom_play_botton text-right">
                                <p class="custom_date">${match.date}</p>
                            </div>
                        </div>
                    </a>
                `;
            }
        });
        outputTennis += `</div>`;

        outputTennis += `
            <div class="schedule-divider mt-5">
                <h4>Tommorow</h4>        
        `;

        data.forEach((match, index) => {
            if (match.is_streaming == true) {
                outputTennis += `
                    <a class="custom_match_link" href="${match.streaming_url}">
                        <div class="custom_match_layout row">
                            <div class="col-3 custom_image">
                                <img src="${match.tournament_logo}"/>
                            </div>
                            <div class="col-6 custom_match_info text-center">
                                <h2 class="custom_name">${match.player1_name} vs ${match.player2_name}</h2>
                                <h3 class="custom_tournament_name">${match.tournament}</h3>
                            </div>
                            <div class="col-3 custom_play_botton">
                                <div class="match_is_playing">
                                    <img src="../images/live-icon.png"/>
                                    <p style="text-align: center;">LIVE</p>
                                </div>
                            </div>
                        </div>
                    </a>
                `;
            } else {
                outputTennis += `
                    <a class="custom_match_link" href="${match.streaming_url}">
                        <div class="custom_match_layout row">
                            <div class="col-3 custom_image">
                                <img src="${match.tournament_logo}"/>
                            </div>
                            <div class="col-6 custom_match_info text-center">
                                <h2 class="custom_name">${match.player1_name} vs ${match.player2_name}</h2>
                                <h3 class="custom_tournament_name">${match.tournament}</h3>
                            </div>
                            <div class="col-3 custom_play_botton text-right">
                                <p class="custom_date">${match.date}</p>
                            </div>
                        </div>
                    </a>
                `;
            }
        });
        outputTennis += `</div>`;

        tennisContainer.innerHTML = outputTennis;
    }
    // innerTennisBlock(tennisData);

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