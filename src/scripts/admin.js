import 'babel-polyfill';
import moment from 'moment';
import axios from 'axios';

(async () => {
    const innerViewDataInModal = (item, index, streamingStatus) => {
        let output = '';
        
        if (item.type.name === 'tennis') {
            output += `
                <div class="modal fade" id="modal-detail-${index}" tabindex="-1" role="dialog">
                    <div class="modal-dialog" href="#" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">${item.title}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">                    
                                <div class="row">
                                    <div class="col-12 d-flex flex-column justify-content-center align-items-center">
                                        <img 
                                            style="width: 50px; height: 50px;"
                                            src="${item.fc1ImgUrl}" 
                                            alt="Logo">
                                        <p class="text-center">${item.tournament}</p> 
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Match type: 
                                            <small> ${item.type.name}</small>
                                        </p> 
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-5 d-flex flex-column justify-content-center align-items-center">
                                        <p class="text-center">Player 1:
                                            <small>${item.fc1}</small>
                                        </p>
                                    </div>
                                    <div class="col-2 d-flex justify-content-center align-items-center">
                                        <p>${item.score1} - ${item.score2}</p>
                                    </div>
                                    <div class="col-5 d-flex flex-column justify-content-center align-items-center">                                    
                                        <p class="text-center">Player 2:
                                            <small>${item.fc2}</small>
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
                                            <small> ${item.time}</small>
                                        </p> 
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Streaming key: 
                                            <small> ${item.streaming.streamingUrl[0]}</small>
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
                <div class="modal fade" id="modal-detail-${index}" tabindex="-1" role="dialog">
                    <div class="modal-dialog" href="#" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${item.title}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">                    
                            <div class="row">
                                <div class="col-12">
                                    <p>Tournament: 
                                        <small> ${item.tournament}</small>
                                    </p> 
                                </div>
                            </div>
                            <hr/>
                            <div class="row mt-2">
                                <div class="col-12">
                                    <p>Match type: 
                                        <small> ${item.type.name}</small>
                                    </p> 
                                </div>
                            </div>
                            <hr/>
                            <div class="row mt-2">
                                <div class="col-5 d-flex flex-column justify-content-center align-items-center">
                                    <img 
                                        style="width: 50px; height: 50px;"
                                        src="${item.fc1ImgUrl}" 
                                        alt="Logo">
                                    <p class="text-center">
                                        <small>${item.fc1}</small>
                                    </p>
                                </div>
                                <div class="col-2 d-flex justify-content-center align-items-center">
                                    <p>${item.score1} - ${item.score2}</p>
                                </div>
                                <div class="col-5 d-flex flex-column justify-content-center align-items-center">
                                    <img 
                                        style="width: 50px; height: 50px;"
                                        src="${item.fc2ImgUrl}" 
                                        alt="Logo">
                                    <p class="text-center">
                                        <small>${item.fc2}</small>
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
                                        <small> ${item.time}</small>
                                    </p> 
                                </div>
                            </div>
                            <hr/>
                            <div class="row mt-2">
                                <div class="col-12">
                                    <p>Streaming key: 
                                        <small> ${item.streaming.streamingUrl[0]}</small>
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
        let output = '';

        if (item.type.name === 'tennis') {
            output += `
                <div class="modal fade" id="modal-update-${index}" tabindex="-1" role="dialog">
                    <div class="modal-dialog" href="#" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">${item.title}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">                    
                                <div class="row">
                                    <div class="col-12 d-flex flex-column justify-content-center align-items-center">
                                        <img 
                                            style="width: 50px; height: 50px;"
                                            src="${item.fc1ImgUrl}" 
                                            alt="Logo">
                                        <p class="text-center">${item.tournament}</p> 
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Match type: 
                                            <small> ${item.type.name}</small>
                                        </p> 
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-5 d-flex flex-column justify-content-center align-items-center">
                                        <p class="text-center">Player 1:
                                            <small>${item.fc1}</small>
                                        </p>
                                    </div>
                                    <div class="col-2 d-flex justify-content-center align-items-center">
                                        <input 
                                            class="input-modify-score" 
                                            value="${item.score1}">
                                        -
                                        <input 
                                            class="input-modify-score" 
                                            value="${item.score2}">
                                    </div>
                                    <div class="col-5 d-flex flex-column justify-content-center align-items-center">                                    
                                        <p class="text-center">Player 2:
                                            <small>${item.fc2}</small>
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
                                            <small> ${item.time}</small>
                                        </p> 
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Streaming key: 
                                            <small> ${item.streaming.streamingUrl[0]}</small>
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
                <div class="modal fade" id="modal-update-${index}" tabindex="-1" role="dialog">
                    <div class="modal-dialog" href="#" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">${item.title}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">                    
                                <div class="row">
                                    <div class="col-12">
                                        <p>Tournament: 
                                            <small> ${item.tournament}</small>
                                        </p> 
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Match type: 
                                            <small> ${item.type.name}</small>
                                        </p> 
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-5 d-flex flex-column justify-content-center align-items-center">
                                        <img 
                                            style="width: 50px; height: 50px;"
                                            src="${item.fc1ImgUrl}" 
                                            alt="Logo">
                                        <p class="text-center">
                                            <small>${item.fc1}</small>
                                        </p>
                                    </div>
                                    <div class="col-2 d-flex justify-content-center align-items-center">
                                        <input 
                                            class="input-modify-score" 
                                            value="${item.score1}">
                                        -
                                        <input 
                                            class="input-modify-score" 
                                            value="${item.score2}">
                                    </div>
                                    <div class="col-5 d-flex flex-column justify-content-center align-items-center">
                                        <img 
                                            style="width: 50px; height: 50px;"
                                            src="${item.fc2ImgUrl}" 
                                            alt="Logo">
                                        <p class="text-center">
                                            <small>${item.fc2}</small>
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
                                            <small> ${item.time}</small>
                                        </p> 
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Streaming key: 
                                            <small> ${item.streaming.streamingUrl[0]}</small>
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

    const getMatches = async () => {
        try {
            const matches = await axios({
                method: 'get',
                url: '/api/matches',
            });
            
            return matches.data.matches;
        } catch (error) {
            console.log(error.response);
            return [];
        }
    }
    const matches = await getMatches();

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
            if (item.time) {
                item.time = moment(item.time).subtract(7, 'hours').format('DD-MM-YYYY, HH:mm:A');
            }
            const streamingStatus = streamingStatusEnum[item.streaming.status.toString()];
    
            // show shutdown dropdown item if video is streaming
            if (item.streaming.status == true) {
                html += `
                <tr>
                    <th style="text-overflow: hidden;" scope="row">${item.title}</th>
                    <td>${item.tournament}</td>
                    <td> 
                        <span class="badge ${streamingStatus.class} p-2">${streamingStatus.html}</span>
                    </td>
                    <td>${item.score1} - ${item.score2}</td>
                    <td>
                        <div class="dropdown"><button class="btn btn-sm btn-secondary dropdown-toggle" id="dropdown-action" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action</button>
                            <div class="dropdown-menu" aria-labelledby="dropdown-action">
                                <a class="dropdown-item" style="cursor: pointer" data-toggle="modal" data-target="#modal-detail-${index}">Detail</a>
                                <a class="dropdown-item" style="cursor: pointer" data-toggle="modal" data-target="#modal-update-${index}">Update</a>
                                <a class="dropdown-item" style="cursor: pointer" >Shutdown</a>
                            </div>
                        </div>
                    </td>
                </tr>
            `;
            } else {
                html += `
                <tr>
                    <th style="text-overflow: hidden;" scope="row">${item.title}</th>
                    <td>${item.tournament}</td>
                    <td> 
                        <span class="badge ${streamingStatus.class} p-2">${streamingStatus.html}</span>
                    </td>
                    <td>${item.score1} - ${item.score2}</td>
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
    
            modals += innerViewDataInModal(item, index, streamingStatus);
            modals += innerUpdateDataInModal(item, index, streamingStatus);
        });
    
        html += `</tbody>`;
        return {
            html,
            modals
        };
    }

    const pagination = (data) => {
        $('.pagination').pagination({
            dataSource: data,
            pageSize: 5,
            showGoInput: true,
            showGoButton: true,
            showPrevious: false,
            showNext: false,
            callback: function (data, pagination) {
                const {
                    html,
                    modals
                } = templateTableData(data);
                $('.table-pagination-data').html(html);
                $(modals).appendTo('body');
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