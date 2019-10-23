import 'babel-polyfill';
import axios from 'axios';
import moment from 'moment';

const scheduleData = require('./data/fakeScheduleData.json');
const tennisData = require('./data/fakeTennisData.json');
const streamingData = require('./data/fakeStreamingData.json');

(async () => {
    const getMatches = async () => {
        try {
            const matches = await axios({
                method: 'get',
                url: 'http://localhost:5000/api/matches'
            })

            return matches;
        } catch (error) {
            console.log(error.response);
        }
    }
    const matches = await getMatches();
    
    const innerFootballBlock = (data) => {
        const scheduler = document.querySelector('.schedule-container');    

        let outputScheduler = `
            <h2 class="schedule-heading">Schedule</h2>
            <hr/>
            <div class="sport-type-container text-center">
                <span class="ml-2 sport-type">Football</span>
                <br/>
                <div class="schedule-divider mt-4">
                    <h4 class="text-center">Today</h4>
        `;

        data.forEach((match, index) => {
            if (match.is_streaming === 0) {
                outputScheduler += `
                    <a class="row schedule-item-containers" href="${match.streaming_url}">
                        <div class="col-sm-5 col-md-5 d-flex flex-row align-items-center schedule-item-left-content">
                            <img 
                                class="rounded-circle img-responsive schedule-team-img" 
                                src="${match.team1_logo}"/>
                            <div class="schedule-team-name-container schedule-team-name-container-1">
                                <p class="schedule-team-name-content schedule-team-name-content-left schedule-team-name-content-left-today">
                                    ${match.team1_name}
                                </p>
                            </div>
                        </div>
                        <div class="col-sm-2 col-md-2 col-xl-2 schedule-time-container d-flex flex-column">
                            <p class="schedule-time">14:00</p>
                            <strong class="schedule-tour-name">${match.date}</strong>
                        </div>
                        <div
                            class="col-sm-5 col-md-5 d-flex flex-row align-items-center justify-content-end schedule-item-right-content">
                            <div class="schedule-team-name-container schedule-team-name-container-2">
                                <p class="schedule-team-name-content schedule-team-name-content-right">
                                    ${match.team2_name}
                                </p>
                            </div>
                            <img 
                                class="rounded-circle img-responsive schedule-team-img" 
                                src="${match.team2_logo}"/>
                        </div>
                    </a>
                `;
            } else {
                outputScheduler += `
                    <a class="row schedule-item-containers" href="${match.streaming_url}">
                        <div class="col-sm-5 col-md-5 d-flex flex-row align-items-center schedule-item-left-content">
                            <img 
                                class="rounded-circle img-responsive schedule-team-img" 
                                src="${match.team1_logo}"/>
                            <div class="schedule-team-name-container schedule-team-name-container-1">
                                <p class="schedule-team-name-content schedule-team-name-content-left schedule-team-name-content-left-today">
                                    ${match.team1_name}
                                </p>
                            </div>
                        </div>
                        <div class="col-sm-2 col-md-2 col-xl-2 schedule-time-container d-flex flex-column justify-content-center align-items-center">
                            <img 
                                class="schedule-time-img hvr-bounce-in" 
                                src="/images/live-streaming.svg">
                        </div>
                        <div
                            class="col-sm-5 col-md-5 d-flex flex-row align-items-center justify-content-end schedule-item-right-content">
                            <div class="schedule-team-name-container schedule-team-name-container-2">
                                <p class="schedule-team-name-content schedule-team-name-content-right">
                                    ${match.team2_name}
                                </p>
                            </div>
                            <img 
                                class="rounded-circle img-responsive schedule-team-img" 
                                src="${match.team2_logo}"/>
                        </div>
                    </a>
                `;
            }
        });
        outputScheduler += `</div>`;

        outputScheduler += `
            <div class="schedule-divider mt-4">
                <h4 class="text-center">Tommorow</h4>
        `;

        data.forEach((match, index) => {
            if (match.is_streaming === 0) {
                outputScheduler += `
                    <a class="row schedule-item-containers" href="${match.streaming_url}">
                        <div class="col-sm-5 col-md-5 d-flex flex-row align-items-center schedule-item-left-content schedule-item-left-content-tommorow">
                            <img 
                                class="rounded-circle img-responsive schedule-team-img" 
                                src="${match.team1_logo}"/>
                            <div class="schedule-team-name-container schedule-team-name-container-1">
                                <p class="schedule-team-name-content schedule-team-name-content-left schedule-team-name-content-left-tommorow">
                                    ${match.team1_name}
                                </p>
                            </div>
                        </div>
                        <div class="col-sm-2 col-md-2 col-xl-2 schedule-time-container d-flex flex-column">
                            <p class="schedule-time">14:00</p>
                            <strong class="schedule-tour-name">${match.date}</strong>
                        </div>
                        <div
                            class="col-sm-5 col-md-5 d-flex flex-row align-items-center justify-content-end schedule-item-right-content">
                            <div class="schedule-team-name-container schedule-team-name-container-2">
                                <p class="schedule-team-name-content schedule-team-name-content-right">
                                    ${match.team2_name}
                                </p>
                            </div>
                            <img 
                                class="rounded-circle img-responsive schedule-team-img" 
                                src="${match.team2_logo}"/>
                        </div>
                    </a>
                `;
            } else {
                outputScheduler += `
                    <a class="row schedule-item-containers" href="${match.streaming_url}">
                        <div class="col-sm-5 col-md-5 d-flex flex-row align-items-center schedule-item-left-content">
                            <img 
                                class="rounded-circle img-responsive schedule-team-img" 
                                src="${match.team1_logo}"/>
                            <div class="schedule-team-name-container schedule-team-name-container-1">
                                <p class="schedule-team-name-content schedule-team-name-content-left schedule-team-name-content-left-tommorow">
                                    ${match.team1_name}
                                </p>
                            </div>
                        </div>
                        <div class="col-sm-2 col-md-2 col-xl-2 schedule-time-container d-flex flex-column justify-content-center align-items-center">
                            <img 
                                class="schedule-time-img hvr-bounce-in" 
                                src="/images/live-streaming.svg">
                        </div>
                        <div
                            class="col-sm-5 col-md-5 d-flex flex-row align-items-center justify-content-end schedule-item-right-content">
                            <div class="schedule-team-name-container schedule-team-name-container-2">
                                <p class="schedule-team-name-content schedule-team-name-content-right">
                                    ${match.team2_name}
                                </p>
                            </div>
                            <img 
                                class="rounded-circle img-responsive schedule-team-img" 
                                src="${match.team2_logo}"/>
                        </div>
                    </a>
                `;
            }
        });
        outputScheduler += `</div>`;
        outputScheduler += `</div>`;

        scheduler.innerHTML = outputScheduler;

        // assign ::before content to today elements
        const inlineTextTodayEls = Array.from(document.querySelectorAll('.schedule-team-name-content-left-today'));

        inlineTextTodayEls.forEach((item, index) => {
            item.setAttribute('data-before', data[index].tournament);
        })

        // assign ::before content to tommorow elements
        const inlineTextTommorowEls = Array.from(document.querySelectorAll('.schedule-team-name-content-left-tommorow'));
        inlineTextTommorowEls.forEach((item, index) => {
            item.setAttribute('data-before', data[index].tournament);
        })
    }
    // innerFootballBlock(scheduleData);

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