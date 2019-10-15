const cloneScheduleData = [{
        imgSrc: ['/images/representative.jpg', '/images/representative.jpg'],
        imgAlt: ['Boba Marine', 'Lokey Esport'],
        teamName: ['Boba Marine', 'Lokey Esport'],
        time: '14:00',
        date: '11/10/2019',
        tournament: 'Vòng loại',
        streamingKey: "streaming2",
        isStreaming: true,
    },
    {
        imgSrc: ['/images/representative.jpg', '/images/representative.jpg'],
        imgAlt: ['SKT T1 Telecom', 'GAM'],
        teamName: ['SKT T1 Telecom', 'GAM'],
        time: '14:00',
        date: '12/10/2019',
        tournament: 'Vòng bảng',
        streamingKey: "streaming2",
        isStreaming: true,
    },
    {
        imgSrc: ['/images/representative.jpg', '/images/representative.jpg'],
        imgAlt: ['Boba Marine', 'Lokey Esport'],
        teamName: ['Boba Marine', 'Lokey Esport'],
        time: '15:00',
        date: '12/10/2019',
        tournament: 'Chung kết thế giới',
        streamingKey: "streaming1",
        isStreaming: true,
    },
    {
        imgSrc: ['/images/representative.jpg', '/images/representative.jpg'],
        imgAlt: ['Boba Marine', 'Lokey Esport'],
        teamName: ['Boba Marine', 'Lokey Esport'],
        time: '16:00',
        date: '12/10/2019',
        tournament: 'Chung kết thế giới',
        streamingKey: "streaming1",
        isStreaming: false,
    },
    {
        imgSrc: ['/images/representative.jpg', '/images/representative.jpg'],
        imgAlt: ['Boba Marine', 'Lokey Esport'],
        teamName: ['Boba Marine', 'Lokey Esport'],
        time: '16:00',
        date: '12/10/2019',
        tournament: 'Chung kết thế giới',
        streamingKey: "streaming1",
        isStreaming: false,
    },
    {
        imgSrc: ['/images/representative.jpg', '/images/representative.jpg'],
        imgAlt: ['Boba Marine', 'Lokey Esport'],
        teamName: ['Boba Marine', 'Lokey Esport'],
        time: '18:00',
        date: '12/10/2019',
        tournament: 'Chung kết thế giới',
        streamingKey: "streaming1",
        isStreaming: false,
    },
    {
        imgSrc: ['/images/representative.jpg', '/images/representative.jpg'],
        imgAlt: ['Boba Marine', 'Lokey Esport'],
        teamName: ['Boba Marine', 'Lokey Esport'],
        time: '14:00',
        date: '13/10/2019',
        tournament: 'Chung kết thế giới',
        streamingKey: "streaming1",
        isStreaming: false,
    },
    {
        imgSrc: ['/images/representative.jpg', '/images/representative.jpg'],
        imgAlt: ['Boba Marine', 'Lokey Esport'],
        teamName: ['Boba Marine', 'Lokey Esport'],
        time: '14:00',
        date: '14/10/2019',
        tournament: 'Chung kết thế giới',
        streamingKey: "streaming2",
        isStreaming: false,
    }
];

const cloneStreamingData = [{
        teamName: ['BAGA', 'PetLand'],
        score: '0 - 1',
        tournament: 'Vietnem'
    },
    {
        teamName: ['BAGA', 'PetLand'],
        score: '0 - 1',
        tournament: 'Vietnem'
    },
    {
        teamName: ['BAGA', 'PetLand'],
        score: '0 - 1',
        tournament: 'Vietnem'
    },
    {
        teamName: ['BAGA', 'PetLand'],
        score: '0 - 1',
        tournament: 'Vietnem'
    },
    {
        teamName: ['BAGA', 'PetLand'],
        score: '0 - 1',
        tournament: 'Vietnem'
    },
    {
        teamName: ['BAGA', 'PetLand'],
        score: '0 - 1',
        tournament: 'Vietnem'
    },
    {
        teamName: ['BAGA', 'PetLand'],
        score: '0 - 1',
        tournament: 'Vietnem'
    },
    {
        teamName: ['BAGA', 'PetLand'],
        score: '0 - 1',
        tournament: 'Vietnem'
    },
];

const renderScheduleBlock = (data) => {
    const scheduler = document.querySelector('.schedule-container');    

    let outputScheduler = `
        <h2 class="schedule-heading">Lịch phát</h2>
        <hr/>
        <div class="sport-type-container text-center">
            <span class="ml-2 sport-type">BÓNG ĐÁ</span>
        </div>
    `;
    
    data.forEach((match, index) => {
        if (match.isStreaming === true) {
            outputScheduler += `
                <a class="row schedule-item-containers" href="${match.streamingKey}">
                    <div class="col-sm-5 col-md-5 d-flex flex-row align-items-center">
                        <img class="rounded-circle img-responsive schedule-team-img" src="${match.imgSrc[0]}" alt="${match.imgSrc[1]}" />
                        <div class="schedule-team-name-container schedule-team-name-container-1">
                            <p class="schedule-team-name-content schedule-team-name-content-left">${match.teamName[0]}</p>
                        </div>
                    </div>
                    <div class="col-sm-2 col-md-2 col-xl-2 schedule-time-container d-flex flex-column justify-content-center align-items-center">
                        <img class="schedule-time-img hvr-bounce-in" src="../images/live-icon.png" alt="Live streaming" />
                        <strong class="schedule-team-img-live">Live</strong>
                    </div>
                    <div class="col-sm-5 col-md-5 d-flex flex-row align-items-center justify-content-end">
                        <div class="schedule-team-name-container schedule-team-name-container-2">
                            <p class="schedule-team-name-content schedule-team-name-content-right">${match.teamName[1]}</p>
                        </div><img class="rounded-circle img-responsive schedule-team-img" src="${match.imgSrc[1]}" alt="${match.imgAlt[1]}" /></div>
                </a>
            `;
        } else {
            outputScheduler += `
                <a class="row schedule-item-containers" href="${match.streamingKey}">
                    <div class="col-sm-5 col-md-5 d-flex flex-row align-items-center">
                        <img class="rounded-circle img-responsive schedule-team-img" src="${match.imgSrc[0]}" alt="${match.imgAlt[0]}" />
                        <div class="schedule-team-name-container schedule-team-name-container-1">
                            <p class="schedule-team-name-content schedule-team-name-content-left">${match.teamName[0]}</p>
                        </div>
                    </div>
                    <div class="col-sm-2 col-md-2 col-xl-2 schedule-time-container d-flex flex-column justify-content-center align-items-center">
                        <p class="schedule-time">${match.time}</p><strong class="schedule-tour-name">${match.date}</strong></div>
                    <div class="col-sm-5 col-md-5 d-flex flex-row align-items-center justify-content-end">
                        <div class="schedule-team-name-container schedule-team-name-container-2">
                            <p class="schedule-team-name-content schedule-team-name-content-right">${match.teamName[1]}</p>
                        </div><img class="rounded-circle img-responsive schedule-team-img" src="${match.imgSrc[1]}" alt="${match.imgAlt[1]}" />
                    </div>
                </a>
            `;
        }
    });

    scheduler.innerHTML = outputScheduler;

    // assign ::before content to elements
    const inlineTextEls = Array.from(document.querySelectorAll('.schedule-team-name-content-left'));
    data.forEach((match, index) => {
        inlineTextEls[index].setAttribute('data-before', match.tournament);
    })
}
// renderScheduleBlock(cloneScheduleData);

const renderStreamingBlock = (data) => {
    const streamingContainer = document.querySelector('.streaming-container');
    let streamingOutput = '';

    data.forEach(item => {
        streamingOutput += `
            <div class="streaming-card row w-75 mx-auto mb-3">
                <div class="col-4 streaming-card-title-container d-flex flex-row align-items-center"><i class="fas fa-tv mr-3"></i>
                    <h3 class="streaming-card-title">${item.tournament}</h3>
                </div>
                <div class="col-3 streaming-card-team-1-container d-flex align-items-center justify-content-center">
                    <p class="streaming-card-team-1">${item.teamName[0]}</p>
                </div>
                <p class="col-1 streaming-card-score d-flex align-items-center justify-content-center">${item.score}</p>
                <div class="col-3 streaming-card-team-2-container d-flex align-items-center justify-content-center">
                    <p class="streaming-card-team-2">${item.teamName[1]}</p>
                </div>
            </div>
        `;
    })
    streamingContainer.innerHTML = streamingOutput;

    Array.from(document.querySelectorAll('.schedule-containers')).forEach(item => {
        item.addEventListener('click', () => {
            localStorage.setItem('key', item.dataset.key);

            window.location = '/streaming.html';
        })
    })
}