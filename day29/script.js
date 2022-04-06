let countdown
const displayTimeLeftElement = document.querySelector('.display__time-left')
const displayEndTimeElement = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')
function timer(seconds) {
    clearInterval(countdown)
    const now = Date.now()
    const then = now + seconds * 1000
    displayTimeLeft(seconds)
    displayEndTime(then)
    countdown = setInterval(()=>{
        const secondsLeft = Math.round((then - Date.now()) / 1000)
        if (secondsLeft < 0) {clearInterval(countdown); return}
        displayTimeLeft(secondsLeft)
    }, 1000)
}

function displayTimeLeft(sec) {
    const min = Math.abs(Math.floor(sec / 60))
    sec = Math.abs(sec % 60)
    const display = `${min}:${sec >= 10 ? sec : '0' + sec}`
    displayTimeLeftElement.textContent = display
    document.title = display
}

function displayEndTime(timestamp) {
    const endTime = new Date(timestamp)
    const hours = endTime.getHours()
    const minutes = endTime.getMinutes()
    displayEndTimeElement.textContent = `Get back at ${hours}:${minutes >= 10 ? minutes : '0' + minutes}`
}

function startTimer(){
    const seconds = parseInt(this.dataset.time)
    timer(seconds)
}

buttons.forEach(button => {button.addEventListener('click', startTimer)})

document.customForm.addEventListener('submit', function(e){
    e.preventDefault()
    const minutes = this.minutes.value;
    this.reset()
    timer(minutes * 60)
})