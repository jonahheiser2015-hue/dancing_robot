const roboterAudio= new Audio('bip_bup.mp3');
let started = false;

roboterAudio.addEventListener('ended', () => {
    started = false;
    document.getElementById('roboter').classList.remove('dancing');

    const button = document.getElementById('weiter');
    button.textContent = 'Weiter';
    button.setAttribute('aria-pressed', 'false');
});

function hallo() {
    alert('hallo');
}

function stop() {
    const button = document.getElementById('weiter');
    const roboter = document.getElementById('roboter');

    started = !started;
    roboter.classList.toggle('dancing', started);
    button.textContent = started ? 'Stop' : 'Weiter';
    button.setAttribute('aria-pressed', String(started));

    if (started) {
        roboterAudio.play().catch((error) => {
            console.error('Der Roboter-Ton konnte nicht abgespielt werden:', error);
            started = false;
            roboter.classList.remove('dancing');
            button.textContent = 'Weiter';
            button.setAttribute('aria-pressed', 'false');
        });
    } else {
        roboterAudio.pause();
    }
}