const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


// create functions
document.addEventListener('keyup', (e) => {
    if(e.key === ' ') {
        togglePlay()
    }
})

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]()
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skipper() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function ranger() {
    video[this.name] = this.value
}
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`
}

function jump(e) {
    const jumpTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = jumpTime;
}

let mousedown = false;

// the event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
skipButtons.forEach(button => button.addEventListener('click', skipper))
toggle.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', jump);
progress.addEventListener('mousemove', (e) => {
    if( mousedown){
        jump(e);
    }
});
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mousedown', () => mouseup = false);
progress.addEventListener('mousedown', () => mouseout = false);


ranges.forEach(range => range.addEventListener('change', ranger));
ranges.forEach(range => range.addEventListener('mousemove', (e) => {
    if(mousedown){
        video[range.name] = range.value
    }
}));


ranges.forEach(range => range.addEventListener('mousedown', () => mousedown = true));
ranges.forEach(range => range.addEventListener('mouseup', () => mousedown = false));









