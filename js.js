// 1. Deine verschiedenen Audio-Objekte erstellen
const ton1 = new Audio('cello.mp3');
const ton2 = new Audio('electroloop.mp3');
const ton3 = new Audio('rollerfever.mp3');
const ton4 = new Audio('secretoflife.mp3');

// In ein Array packen
const playlist = [ton1, ton2, ton3, ton4];

// Standardmäßig ist der erste Ton ausgewählt
let roboterAudio = ton1; 
let letzterIndex = 0; // Da ton1 an Index 0 steht

let started = false;

// Event-Listener für alle Sounds in der Liste hinzufügen
playlist.forEach(audio => {
    audio.addEventListener('ended', () => {
        started = false;
        document.getElementById('roboter').classList.remove('dancing');

        const button = document.getElementById('weiter');
        button.textContent = 'Weiter';
        button.setAttribute('aria-pressed', 'false');
    });
});

// FUNKTION FÜR DEINEN ZUSÄTZLICHEN WÜRFEL-BUTTON
function zufallWuerfeln() {
    // BLOCKIERUNG: Wenn gerade ein Ton läuft, wird das Würfeln blockiert!
    if (started) {
        console.log("Würfeln blockiert: Es läuft gerade ein Ton.");
        return; 
    }

    // Zufälligen Ton ohne direkte Wiederholung auswählen
    let neuerIndex;
    do {
        neuerIndex = Math.floor(Math.random() * playlist.length);
    } while (neuerIndex === letzterIndex);
    
    letzterIndex = neuerIndex;
    roboterAudio = playlist[neuerIndex]; // Neuen Ton für die stop()-Methode bereitlegen

    console.log(`Neuer Ton ausgewählt (Index: ${neuerIndex}). Klicke auf 'Weiter', um ihn zu hören!`);
}

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
        });
    } else {
        roboterAudio.pause();
        roboterAudio.currentTime = 0;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const weiterBtn = document.getElementById('weiter');
    const wuerfelBtn = document.getElementById('wuerfelButton');

    if (weiterBtn) {
        weiterBtn.addEventListener('click', stop);
    }
    if (wuerfelBtn) {
        wuerfelBtn.addEventListener('click', zufallWuerfeln);
    }
});
