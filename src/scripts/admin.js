import 'babel-polyfill';
import moment from 'moment';
import axios from 'axios';

(async () => {
    const hostname = `localhost:5000`;

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
    console.log(matches);

    const addEventToRemoveMatchData = ({ selectors }) => {
        selectors.forEach(selector => {   
            selector.addEventListener('click', async event => {
                event.preventDefault();

                const matchId = event.target.dataset.matchId;

                try {
                    const removeItemResponse = await axios({
                        method: 'delete',
                        url: `http://${hostname}/api/matches/${matchId}`,
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
        item.match.time = moment(item.match.time).format('YYYY-MM-DD, HH:mm');
        
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
                                            >
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
                                        <p class="text-left">
                                            <small>${item.match.fc1}</small>
                                        </p>
                                    </div>
                                    <div class="col-2 d-flex justify-content-center align-items-center">
                                        <p>${item.match.score1} - ${item.match.score2}</p>
                                    </div>
                                    <div class="col-5 d-flex flex-column justify-content-center align-items-end">                                    
                                        <p class="text-right">
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
                                        <p>Streaming keys: </p>`;
                                item.match.streaming.streamingUrl.forEach(streamingUrl => {
                                    output += `<small>${streamingUrl}</small>`;
                                });
                                output += `
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
                                        >
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
                                        >
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
                                    <p>Streaming keys: </p>`;
                                item.match.streaming.streamingUrl.forEach(streamingUrl => {
                                    output += `<small>${streamingUrl}</small>`;
                                });
                                output += `
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
        item.match.time = moment(item.match.time).format('YYYY-MM-DD, HH:mm');
        let output = '';

        if (item.match.type.name === 'tennis') {
            output += `
                <div class="modal fade modals-table-data" id="modal-update-${index}" tabindex="-1" role="dialog">
                    <div class="modal-dialog" href="#" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">
                                    <input
                                        size="40"
                                        id="update-tennis-title-${item.match._id}"
                                        style="border: none; outline: none;"
                                        type="text"
                                        value="${item.match.streaming.streamingTitle}">
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-12 d-flex flex-column justify-content-center align-items-center">
                                        <img 
                                            style="width: 50px; height: 50px;"
                                            src="${item.tournament.tournamentImgUrl}">
                                        <input
                                            class="text-center"
                                            id="update-tennis-tournament-img-${item.match._id}"
                                            style="
                                                border: none; 
                                                outline: none; 
                                                max-width: 100%; 
                                                max-height: 100%;
                                                position: relative;
                                                opacity: 0;
                                                left: -20px;
                                                top: -40px; 
                                                cursor: pointer;"
                                            type="file"
                                            value="">
                                        <input
                                            class="text-center"
                                            size="25"
                                            id="update-tennis-tournament-name-${item.match._id}"
                                            style="border: none; outline: none;"
                                            type="text"
                                            value="${item.tournament.name}" >
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Match type: 
                                            <input
                                                id="update-tennis-type-name-${item.match._id}"
                                                style="border: none; font-size: 80%; font-weight: 400; outline: none;"
                                                type="text"
                                                value="${item.match.type.name}">
                                        </p>
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-5 d-flex flex-column justify-content-center align-items-start">
                                        <input
                                            class="text-left"
                                            id="update-tennis-fc1-${item.match._id}"
                                            style="border: none; font-size: 80%; font-weight: 400; outline: none;"
                                            type="text"
                                            value="${item.match.fc1}">
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
                                        <input
                                            class="text-right"
                                            id="update-tennis-fc2-${item.match._id}"
                                            style="border: none; font-size: 80%; font-weight: 400; outline: none;"
                                            type="text"
                                            value="${item.match.fc2}">
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Streaming status: 
                                            <small>${streamingStatus['html']}</small>
                                        </p> 
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Start time: 
                                            <small>${item.match.time}</small>
                                        </p> 
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Streaming keys: </p> `;
                                item.match.streaming.streamingUrl.forEach(streamingUrl => {
                                    output += `
                                        <input
                                            class="text-left update-tennis-streaming-urls-${item.match._id}"
                                            size="35"
                                            style="border: none; font-size: 80%; font-weight: 400; outline: none;"
                                            type="text"
                                            value="${streamingUrl}">
                                        `;
                                })
                                output += `
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
                                <h5 class="modal-title">
                                    <input
                                        size="40"
                                        id="update-football-title-${item.match._id}"
                                        style="border: none; outline: none;"
                                        type="text"
                                        value="${item.match.streaming.streamingTitle}">
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">                    
                                <div class="row">
                                    <div class="col-12">
                                        <p>Tournament:
                                            <input
                                                class="text-left"
                                                size="25"
                                                id="update-football-tournament-name-${item.match._id}"
                                                style="border: none; font-size: 80%; font-weight: 400; outline: none;"
                                                type="text"
                                                value="${item.tournament.name}" >
                                        </p> 
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Match type: 
                                            <input
                                                id="update-footbal-type-name-${item.match._id}"
                                                style="border: none; font-size: 80%; font-weight: 400; outline: none;"
                                                type="text"
                                                value="${item.match.type.name}">
                                        </p> 
                                    </div>
                                </div>
                                <hr/>
                                <div class="row mt-2">
                                    <div class="col-5 d-flex flex-column justify-content-center align-items-center">
                                        <img 
                                            style="width: 50px; height: 50px;"
                                            src="${item.match.fc1ImgUrl}">
                                        <input
                                            class="text-center"
                                            id="update-football-fc1-img-${item.match._id}"
                                            style="
                                                border: none; 
                                                outline: none; 
                                                max-width: 100%; 
                                                max-height: 100%;
                                                position: relative;
                                                opacity: 0;
                                                top: -40px; 
                                                cursor: pointer;"
                                            type="file"
                                            value="">
                                        <p class="text-center">
                                            <input
                                                class="text-center"
                                                id="update-football-fc1-${item.match._id}"
                                                style="border: none; font-size: 80%; font-weight: 400; outline: none;"
                                                type="text"
                                                value="${item.match.fc1}">
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
                                            src="${item.match.fc2ImgUrl}">
                                        <input
                                            class="text-center"
                                            id="update-football-fc2-img-${item.match._id}"
                                            style="
                                                border: none; 
                                                outline: none; 
                                                max-width: 100%; 
                                                max-height: 100%;
                                                position: relative;
                                                opacity: 0;
                                                top: -40px; 
                                                cursor: pointer;"
                                            type="file"
                                            value="">
                                        <p class="text-center">
                                            <input
                                                class="text-center"
                                                id="update-football-fc2-${item.match._id}"
                                                style="border: none; font-size: 80%; font-weight: 400; outline: none;"
                                                type="text"
                                                value="${item.match.fc2}">
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
                                        <p>Streaming keys:</p>`;
                                item.match.streaming.streamingUrl.forEach(streamingUrl => {
                                    output += `
                                        <input
                                            class="text-left update-football-streaming-urls-${item.match._id}"
                                            size="35"
                                            style="border: none; font-size: 80%; font-weight: 400; outline: none;"
                                            type="text"
                                            value="${streamingUrl}">
                                        `;
                                })
                                output += `
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
                                <a class="dropdown-item remove-match-items" data-match-id="${item.match._id}" style="cursor: pointer">Delete</a>
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
})()