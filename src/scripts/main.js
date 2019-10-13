const cloneScheduleData = [{
        imgSrc: ['/images/representative.jpg', '/images/representative.jpg'],
        alt: 'Alt logo',
        teamName: ['GEORIA', 'VietVi'],
        time: '12/10/2019 - 10:00 PM',
        tournament: 'Euro 2020 Qualification',
        streamingKey: "streaming2",
    },
    {
        imgSrc: ['/images/representative.jpg', '/images/representative.jpg'],
        alt: 'Alt logo',
        teamName: ['GEORIA', 'VietVi'],
        time: '12/10/2019 - 10:00 PM',
        tournament: 'Euro 2020 Qualification',
        streamingKey: "streaming2",
    },
    {
        imgSrc: ['/images/representative.jpg', '/images/representative.jpg'],
        alt: 'Alt logo',
        teamName: ['GEORIA', 'VietVi'],
        time: '12/10/2019 - 10:00 PM',
        tournament: 'Euro 2020 Qualification',
        streamingKey: "streaming1",
    },
    {
        imgSrc: ['/images/representative.jpg', '/images/representative.jpg'],
        alt: 'Alt logo',
        teamName: ['GEORIA', 'VietVi'],
        time: '12/10/2019 - 10:00 PM',
        tournament: 'Euro 2020 Qualification',
        streamingKey: "streaming1",
    },
    {
        imgSrc: ['/images/representative.jpg', '/images/representative.jpg'],
        alt: 'Alt logo',
        teamName: ['GEORIA', 'VietVi'],
        time: '12/10/2019 - 10:00 PM',
        tournament: 'Euro 2020 Qualification',
        streamingKey: "streaming1",
    },
    {
        imgSrc: ['/images/representative.jpg', '/images/representative.jpg'],
        alt: 'Alt logo',
        teamName: ['GEORIA', 'VietVi'],
        time: '12/10/2019 - 10:00 PM',
        tournament: 'Euro 2020 Qualification',
        streamingKey: "streaming1",
    },
    {
        imgSrc: ['/images/representative.jpg', '/images/representative.jpg'],
        alt: 'Alt logo',
        teamName: ['GEORIA', 'VietVi'],
        time: '12/10/2019 - 10:00 PM',
        tournament: 'Euro 2020 Qualification',
        streamingKey: "streaming1",
    },
    {
        imgSrc: ['/images/representative.jpg', '/images/representative.jpg'],
        alt: 'Alt logo',
        teamName: ['GEORIA', 'VietVi'],
        time: '12/10/2019 - 10:00 PM',
        tournament: 'Euro 2020 Qualification',
        streamingKey: "streaming2",
    },
    {
        imgSrc: ['/images/representative.jpg', '/images/representative.jpg'],
        alt: 'Alt logo',
        teamName: ['GEORIA', 'VietVi'],
        time: '12/10/2019 - 10:00 PM',
        tournament: 'Euro 2020 Qualification',
        streamingKey: "streaming1",
    },
    {
        imgSrc: ['/images/representative.jpg', '/images/representative.jpg'],
        alt: 'Alt logo',
        teamName: ['GEORIA', 'VietVi'],
        time: '12/10/2019 - 10:00 PM',
        tournament: 'Euro 2020 Qualification',
        streamingKey: "streaming2",
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
    const scheduler = document.querySelector('.schedule');

    let outputScheduler = '';
    data.forEach(item => {
        outputScheduler += `
            <div class="schedule-containers row" data-key="${item.streamingKey}">
                <div class="col-1"></div>
                <div class="col-4 d-flex flex-row align-items-center justify-content-start schedule-team-1 schedule-team">
                    <img class="rounded-circle img-responsive schedule-team-img" src="${item.imgSrc[0]}" alt="${item.alt}" />
                    <div class="schedule-team-name-container schedule-team-name-container-1">
                        <p class="schedule-team-name">${item.teamName[0]}</p>
                    </div>
                </div>
                <div class="col-2 schedule-time-container d-flex flex-column justify-content-center align-items-center">
                    <p class="schedule-time">${item.time}</p><strong class="schedule-tour-name">Euro 2020 Qualification</strong></div>
                <div class="col-4 d-flex flex-row align-items-center justify-content-end schedule-team-2 schedule-team">
                    <div class="schedule-team-name-container schedule-team-name-container-2">
                        <p class="schedule-team-name">${item.teamName[1]}</p>
                    </div><img class="rounded-circle schedule-team-img img-responsive" src="${item.imgSrc[1]}" alt="${item.alt}" /></div>
                <div class="col-1"></div>
            </div>`;
    })

    scheduler.innerHTML = outputScheduler;
}

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