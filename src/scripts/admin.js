import 'babel-polyfill';
import moment from 'moment';
import axios from 'axios';

(async () => {
    const getMatches = async () => {
        try {
            const matches = await axios({
                method: 'get',
                url: '/api/matches',
            });
            
            return matches.data.response;
        } catch (error) {
            return [];
        }
    }
    const matches = await getMatches();

    const addEventToRemoveMatchData = ({ selectors }) => {
        selectors.forEach(selector => {   
            selector.addEventListener('click', async event => {
                event.preventDefault();

                const matchId = event.target.dataset.matchId;

                try {
                    const removeItemResponse = await axios({
                        method: 'delete',
                        url: `http://localhost:5000/api/matches/${matchId}`,
                    })
                    window.alert('Successfully shutdown stream');
                    window.location = '/admin';
                } catch (error) {
                    window.alert('Failed to shutdown stream, please re-try for several times!');
                }                
            })
        })
    }

    const innerViewDataInModal = (item, index, streamingStatus) => {
        item.match.time = moment(item.match.time).format('YYYY-MM-DD, HH:mm:ss');
        
        let output = '';
        if (item.match.type.name === 'tennis') {                
            output += `
                <div class="modal fade modals-table-data" id="modal-detail-${index}" tabindex="-1" role="dialog">
                    <div class="modal-dialog" href="#" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">${item.match.streaming.streamingTitle}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">                    
                                <div class="row">
                                    <div class="col-12 d-flex flex-column justify-content-center align-items-center">
                                        <img 
                                            style="width: 50px; height: 50px;"
                                            src="${item.tournament.tournamentImgUrl}" 
                                            alt="Logo">
                                        <p class="text-center">${item.tournament.name}</p> 
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Match type: 
                                            <small> ${item.match.type.name}</small>
                                        </p> 
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-5 d-flex flex-column justify-content-center align-items-start">
                                        <p class="text-center">Player 1:
                                            <small>${item.match.fc1}</small>
                                        </p>
                                    </div>
                                    <div class="col-2 d-flex justify-content-center align-items-center">
                                        <p>${item.match.score1} - ${item.match.score2}</p>
                                    </div>
                                    <div class="col-5 d-flex flex-column justify-content-center align-items-end">                                    
                                        <p class="text-center">Player 2:
                                            <small>${item.match.fc2}</small>
                                        </p>
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Streaming status: 
                                            <small> ${streamingStatus['html']}</small>
                                        </p> 
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Start time: 
                                            <small> ${item.match.time}</small>
                                        </p> 
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Streaming key: 
                                            <small> ${item.match.streaming.streamingUrl[0]}</small>
                                        </p> 
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            output += `
                <div class="modal fade modals-table-data" id="modal-detail-${index}" tabindex="-1" role="dialog">
                    <div class="modal-dialog modals-table-data" href="#" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${item.match.streaming.streamingTitle}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">                    
                            <div class="row">
                                <div class="col-12">
                                    <p>Tournament: 
                                        <small> ${item.tournament.name}</small>
                                    </p> 
                                </div>
                            </div>
                            <hr/>
                            <div class="row mt-2">
                                <div class="col-12">
                                    <p>Match type: 
                                        <small> ${item.match.type.name}</small>
                                    </p> 
                                </div>
                            </div>
                            <hr/>
                            <div class="row mt-2">
                                <div class="col-5 d-flex flex-column justify-content-center align-items-center">
                                    <img 
                                        style="width: 50px; height: 50px;"
                                        src="${item.match.fc1ImgUrl}" 
                                        alt="Logo">
                                    <p class="text-center">
                                        <small>${item.match.fc1}</small>
                                    </p>
                                </div>
                                <div class="col-2 d-flex justify-content-center align-items-center">
                                    <p>${item.match.score1} - ${item.match.score2}</p>
                                </div>
                                <div class="col-5 d-flex flex-column justify-content-center align-items-center">
                                    <img 
                                        style="width: 50px; height: 50px;"
                                        src="${item.match.fc2ImgUrl}" 
                                        alt="Logo">
                                    <p class="text-center">
                                        <small>${item.match.fc2}</small>
                                    </p>
                                </div>
                            </div>
                            <hr/>
                            <div class="row mt-2">
                                <div class="col-12">
                                    <p>Streaming status: 
                                        <small> ${streamingStatus['html']}</small>
                                    </p> 
                                </div>
                            </div>
                            <hr/>
                            <div class="row mt-2">
                                <div class="col-12">
                                    <p>Start time: 
                                        <small> ${item.match.time}</small>
                                    </p> 
                                </div>
                            </div>
                            <hr/>
                            <div class="row mt-2">
                                <div class="col-12">
                                    <p>Streaming key: 
                                        <small> ${item.match.streaming.streamingUrl[0]}</small>
                                    </p> 
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        return output;
    }

    const innerUpdateDataInModal = (item, index, streamingStatus) => {
        item.match.time = moment(item.match.time).format('YYYY-MM-DD, HH:mm:ss');
        let output = '';

        if (item.match.type.name === 'tennis') {
            output += `
                <div class="modal fade modals-table-data" id="modal-update-${index}" tabindex="-1" role="dialog">
                    <div class="modal-dialog" href="#" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">${item.match.streaming.streamingTitle}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">                    
                                <div class="row">
                                    <div class="col-12 d-flex flex-column justify-content-center align-items-center">
                                        <img 
                                            style="width: 50px; height: 50px;"
                                            src="${item.tournament.tournamentImgUrl}" 
                                            alt="Logo">
                                        <p class="text-center">${item.tournament.name}</p> 
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Match type: 
                                            <small> ${item.match.type.name}</small>
                                        </p> 
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-5 d-flex flex-column justify-content-center align-items-start">
                                        <p class="text-center">Player 1:
                                            <small>${item.match.fc1}</small>
                                        </p>
                                    </div>
                                    <div class="col-2 d-flex justify-content-center align-items-center">
                                        <input 
                                            class="input-modify-score" 
                                            value="${item.match.score1}">
                                        -
                                        <input 
                                            class="input-modify-score" 
                                            value="${item.match.score2}">
                                    </div>
                                    <div class="col-5 d-flex flex-column justify-content-center align-items-end">                                    
                                        <p class="text-center">Player 2:
                                            <small>${item.match.fc2}</small>
                                        </p>
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Streaming status: 
                                            <small> ${streamingStatus['html']}</small>
                                        </p> 
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Start time: 
                                            <small> ${item.match.time}</small>
                                        </p> 
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Streaming key: 
                                            <small> ${item.match.streaming.streamingUrl[0]}</small>
                                        </p> 
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary btn-sm">Save</button>
                                <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            output += `
                <div class="modal fade modals-table-data" id="modal-update-${index}" tabindex="-1" role="dialog">
                    <div class="modal-dialog" href="#" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">${item.match.streaming.streamingTitle}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">                    
                                <div class="row">
                                    <div class="col-12">
                                        <p>Tournament: 
                                            <small> ${item.tournament.name}</small>
                                        </p> 
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Match type: 
                                            <small> ${item.match.type.name}</small>
                                        </p> 
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-5 d-flex flex-column justify-content-center align-items-center">
                                        <img 
                                            style="width: 50px; height: 50px;"
                                            src="${item.match.fc1ImgUrl}" 
                                            alt="Logo">
                                        <p class="text-center">
                                            <small>${item.match.fc1}</small>
                                        </p>
                                    </div>
                                    <div class="col-2 d-flex justify-content-center align-items-center">
                                        <input 
                                            class="input-modify-score" 
                                            value="${item.match.score1}">
                                        -
                                        <input 
                                            class="input-modify-score" 
                                            value="${item.match.score2}">
                                    </div>
                                    <div class="col-5 d-flex flex-column justify-content-center align-items-center">
                                        <img 
                                            style="width: 50px; height: 50px;"
                                            src="${item.match.fc2ImgUrl}" 
                                            alt="Logo">
                                        <p class="text-center">
                                            <small>${item.match.fc2}</small>
                                        </p>
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Streaming status: 
                                            <small> ${streamingStatus['html']}</small>
                                        </p> 
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Start time: 
                                            <small> ${item.match.time}</small>
                                        </p> 
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Streaming key: 
                                            <small> ${item.match.streaming.streamingUrl[0]}</small>
                                        </p> 
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary btn-sm">Save</button>
                                <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }        

        return output;
    }        

    const clearExistModal = () => {
        const modals = Array.from(document.querySelectorAll('.modals-table-data'));

        modals.forEach(item => {            
            item.parentNode.removeChild(item);
        })
    }
    
    const renderModal = (data) => {
        clearExistModal();
        let modals = '';

        const streamingStatusEnum = {
            'false': {
                html: 'Pending',
                class: 'badge-info'
            },
            'true': {
                html: 'On air',
                class: 'badge-danger'
            },
        }

        data.forEach((item, index) => {            
            const streamingStatus = streamingStatusEnum[item.match.streaming.status.toString()];

            modals += innerViewDataInModal(item, index, streamingStatus);
            modals += innerUpdateDataInModal(item, index, streamingStatus);
        })        
        
        $(modals).appendTo('body');
    }

    const templateTableData = (data) => {
        let html = `
            <thead>
                <tr>
                    <th style="width: 30%;" scope="col">Title</th>
                    <th style="width: 30%;" scope="col">Tournament</th>
                    <th style="width: 15%;" scope="col">Status</th>
                    <th style="width: 10%;" scope="col">Score</th>
                    <th style="width: 15%;" scope="col"></th>
                </tr>
            </thead>
            <tbody>
            `;
    
        const streamingStatusEnum = {
            'false': {
                html: 'Pending',
                class: 'badge-info'
            },
            'true': {
                html: 'On air',
                class: 'badge-danger'
            },
        }
        data.forEach((item, index) => {
            if (item.match.time) {
                item.match.time = moment(item.match.time).subtract(7, 'hours').format('DD-MM-YYYY, HH:mm:A');
            }
            const streamingStatus = streamingStatusEnum[item.match.streaming.status.toString()];
    
            // show shutdown dropdown item if video is streaming
            if (item.match.streaming.status == true) {
                html += `
                <tr>
                    <th style="text-overflow: hidden;" scope="row">${item.match.streaming.streamingTitle}</th>
                    <td>${item.tournament.name}</td>
                    <td> 
                        <span class="badge ${streamingStatus.class} p-2">${streamingStatus.html}</span>
                    </td>
                    <td>${item.match.score1} - ${item.match.score2}</td>
                    <td>
                        <div class="dropdown"><button class="btn btn-sm btn-secondary dropdown-toggle" id="dropdown-action" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action</button>
                            <div class="dropdown-menu" aria-labelledby="dropdown-action">
                                <a class="dropdown-item" style="cursor: pointer" data-toggle="modal" data-target="#modal-detail-${index}">Detail</a>
                                <a class="dropdown-item" style="cursor: pointer" data-toggle="modal" data-target="#modal-update-${index}">Update</a>
                                <a class="dropdown-item remove-match-items" data-match-id="${item.match._id}" style="cursor: pointer" >Shutdown</a>
                            </div>
                        </div>
                    </td>
                </tr>
            `;
            } else {
                html += `
                <tr>
                    <th style="text-overflow: hidden;" scope="row">${item.match.streaming.streamingTitle}</th>
                    <td>${item.tournament.name}</td>
                    <td> 
                        <span class="badge ${streamingStatus.class} p-2">${streamingStatus.html}</span>
                    </td>
                    <td>${item.match.score1} - ${item.match.score2}</td>
                    <td>
                        <div class="dropdown"><button class="btn btn-sm btn-secondary dropdown-toggle" id="dropdown-action" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action</button>
                            <div class="dropdown-menu" aria-labelledby="dropdown-action">
                                <a class="dropdown-item" style="cursor: pointer" data-toggle="modal" data-target="#modal-detail-${index}">Detail</a>
                                <a class="dropdown-item" style="cursor: pointer" data-toggle="modal" data-target="#modal-update-${index}">Update</a>
                            </div>
                        </div>
                    </td>
                </tr>
            `;
            }                
        });
    
        html += `</tbody>`;
        return html;
    }

    const pagination = (data) => {
        $('.pagination').pagination({
            dataSource: data,
            pageSize: 5,
            showGoInput: true,
            showGoButton: true,
            showPrevious: false,
            showNext: false,
            formatResult: function(data) {                
                renderModal(data);
            },
            callback: function (data, pagination) {
                const html = templateTableData(data);
                $('.table-pagination-data').html(html);

                // add remove data events to Shutdown button everytime re-render data table
                addEventToRemoveMatchData({ selectors: document.querySelectorAll('.remove-match-items') });
            }
        })
    }
    pagination(matches);    

    const baseSource = 'http://45.63.62.153:3002/live/loi/index.m3u8';
    const streaming = (baseSource) => {
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

        if (video.src) {
            const videoFound = document.querySelector('.video-not-found');
            videoFound.setAttribute('style', 'display: none !important');
            videoFound.classList.remove('d-flex', 'flex-column');
        } else {
            const videoFound = document.querySelector('.video-not-found');
            videoFound.setAttribute('style', 'display: flex');
            videoFound.classList.add('d-flex', 'flex-column');
        }
    }
})()