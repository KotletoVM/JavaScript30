window.addEventListener('keydown', playSound);

function removeTransition(e) {
	if (e.propertyName !== 'transform') return;
	this.classList.remove('playing');
}

function playSound(e) {
	const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
	const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
	if (!audio && !key) return;
	key.classList.add('playing')
	audio.currentTime = 0;
	audio.play();
}

const keys = document.querySelectorAll(`.key`);
keys.forEach(key => {
	key.addEventListener('transitionend', removeTransition);
})