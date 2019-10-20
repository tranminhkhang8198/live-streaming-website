const tableData = require('./data/fakeTableData.json');

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
        '-1': {
            html: 'Unset',
            class: 'badge-secondary'
        },
        '0': {
            html: 'Pending',
            class: 'badge-info'
        },
        '1': {
            html: 'On air',
            class: 'badge-danger'
        },
    }
    data.forEach((item, index) => {
        const streamingStatus = streamingStatusEnum[item.is_streaming.toString()];

        // show shutdown dropdown item if video is streaming
        if (streamingStatus.html === 'On air') {
            html += `
            <tr>
                <th style="text-overflow: hidden;" scope="row">${item.title}</th>
                <td>${item.tournament}</td>
                <td> 
                    <span class="badge ${streamingStatus.class} p-2">${streamingStatus.html}</span>
                </td>
                <td>${item.score}</td>
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
                <td>${item.score}</td>
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

        modals += `
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
                            <div class="col-5 d-flex flex-column justify-content-center align-items-center">
                                <img 
                                    src="${item.team1_logo}" 
                                    alt="${item.team1_logo}">
                                <p class="text-center">
                                    <small>${item.team1_name}</small>
                                </p>
                            </div>
                            <div class="col-2 d-flex justify-content-center align-items-center">
                                <p>${item.score}</p>
                            </div>
                            <div class="col-5 d-flex flex-column justify-content-center align-items-center">
                                <img 
                                    src="${item.team2_logo}" 
                                    alt="${item.team2_logo}">
                                <p class="text-center">
                                    <small>${item.team2_name}</small>
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
                                    <small> ${item.date}</small>
                                </p> 
                            </div>
                        </div>
                        <hr/>
                        <div class="row mt-2">
                            <div class="col-12">
                                <p>Streaming key: 
                                    <small> ${item.streaming_key}</small>
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

        modals += `
            <div class="modal fade" id="modal-update-${index}" tabindex="-1" role="dialog">
                <div class="modal-dialog" href="#" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">                            
                            <input 
                                class="input-modify-title" 
                                value="${item.title}">
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
                                        class="input-modify-tournament" 
                                        value="${item.tournament}">
                                </p> 
                            </div>
                        </div>
                        <hr/>
                        <div class="row mt-2">
                            <div class="col-5 d-flex flex-column justify-content-center align-items-center">
                                <div 
                                    style="background-image: url(${item.team1_logo});"
                                    class="position-relative team-logo">
                                    <input 
                                        type="file"
                                        title="Change team logo"
                                        class="position-absolute input-modify-team1-logo input-modify-team-logo">
                                </div>
                                <input 
                                    class="input-modify-team1-name input-modify-team-name"
                                    value="${item.team1_name}">
                            </div>
                            <div class="col-2 d-flex justify-content-center align-items-center">
                                <input 
                                    class="input-modify-score" 
                                    value="${item.score}">
                            </div>
                            <div class="col-5 d-flex flex-column justify-content-center align-items-center">
                                <div 
                                    style="background-image: url(${item.team2_logo});"
                                    class="position-relative team-logo">
                                    <input 
                                        type="file"
                                        title="Change team logo"
                                        class="position-absolute input-modify-team2-logo input-modify-team-logo">
                                </div>
                                <input
                                    class="input-modify-team2-name input-modify-team-name"
                                    value="${item.team2_name}">
                            </div>
                        </div>
                        <hr/>
                        <div class="row mt-2">
                            <div class="col-12">
                                <p>Start time:
                                    <input 
                                        class="input-modify-date" 
                                        type="date"
                                        value="${item.date}">
                                </p> 
                            </div>
                        </div>
                        <hr/>
                        <div class="row mt-2">
                            <div class="col-12">
                                <p>Streaming key:
                                    <input
                                        class="input-modify-key"
                                        value="${item.streaming_key}">
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" data-edit-item="${index}" date-edit-id="${item._id['$oid']}">Save</button>
                        <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
        `;
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
pagination(tableData);

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