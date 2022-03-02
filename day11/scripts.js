/* Get Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Functions */
//playback toggling function 
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

//play icon change function
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

//the function of rewinding the video for a specified time forward or backward  
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

//function to change parameters to a specified value 
//used to change video playback speed and to change audio volume 
function handleRangeUpdate() {
    video[this.name] = this.value;
}

//function to display the current progress of the video 
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

//function to rewind the video to the specified point 
function scrub(e) {
    video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}

/* Hook up the event listeners */
//event listeners for video element
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

//event listener for toggle button
toggle.addEventListener('click', togglePlay);

//event listeners for skip buttons
skipButtons.forEach(button => button.addEventListener('click', skip));

//event listeners for sound and playback speed ranges  
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

//variable that stores the boolean value of the mouse down
//used to rewind to a specific fragment of the video only when the mouse button is held down
let mousedown = false;

//event listeners for progress bar
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);