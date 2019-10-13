const slideUp = {
    distance: '250%',
    origin: 'bottom',
    opacity: 0,
    duration: 500,
    delay: 100,
    scale: .2,
    mobile: false,
}

const slideRight = {
    distance: '250%',
    origin: 'left',
    opacity: 0,
    duration: 500,
    delay: 100,
    scale: .2,
    mobile: false,
}

const reveal = {        
    opacity: 0,
    duration: 700,
    delay: 100,
    mobile: false,
    reset: true,
}

// query selectors
const scheduleEles = document.querySelectorAll('.schedule-item-containers');
const streamingCardEles = document.querySelectorAll('.streaming-card-containers');
const tennisCards = document.querySelectorAll('.custom_match_layout');

ScrollReveal().reveal(streamingCardEles, slideUp);
ScrollReveal().reveal(scheduleEles, reveal);
ScrollReveal().reveal(tennisCards, slideRight);