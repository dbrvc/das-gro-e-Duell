// Score-Variablen
let wins = 0;
let losses = 0;
let draws = 0;

// Schwierigkeitsgrad aus URL holen
const urlParams = new URLSearchParams(window.location.search);
const difficulty = urlParams.get('difficulty') || 'medium';
let opponentName = '';
switch (difficulty) {
    case 'easy': opponentName = 'Baby Bot'; break;
    case 'medium': opponentName = 'Smart Bot'; break;
    case 'hard': opponentName = 'Master Bot'; break;
}
document.getElementById('opponent').innerText = opponentName;

function spiel(wahl) {
    const optionen = ['schere', 'stein', 'papier'];
    let computerWahl;

    // Schwierigkeitsgrad-Logik
    if (difficulty === 'easy') {
        // Baby Bot: 70% Chance, dass Spieler gewinnt
        computerWahl = biasedChoice(wahl, 0.7);
    } else if (difficulty === 'hard') {
        // Master Bot: 70% Chance, dass Computer gewinnt
        computerWahl = biasedChoice(wahl, 0.3);
    } else {
        // Smart Bot: Zufällige Wahl
        computerWahl = optionen[Math.floor(Math.random() * 3)];
    }

    let ergebnis;
    const computerIcon = document.getElementById('computerIcon');
    computerIcon.innerHTML = getIcon(computerWahl);
    computerIcon.classList.add('shake');

    // Ergebnis bestimmen und Score aktualisieren
    if (wahl === computerWahl) {
        ergebnis = 'Unentschieden! 🤝';
        draws++;
        document.getElementById('draws').innerText = draws;
    } else if (
        (wahl === 'schere' && computerWahl === 'papier') ||
        (wahl === 'stein' && computerWahl === 'schere') ||
        (wahl === 'papier' && computerWahl === 'stein')
    ) {
        ergebnis = 'Du gewinnst! 🎉';
        wins++;
        document.getElementById('wins').innerText = wins;
        document.getElementById('resultat').classList.add('win');
    } else {
        ergebnis = 'Du verlierst! 💥';
        losses++;
        document.getElementById('losses').innerText = losses;
        document.getElementById('resultat').classList.add('lose');
    }

    const resultText = document.getElementById('spielResult');
    resultText.innerText = `Du wählst ${wahl}, ${opponentName} wählt ${computerWahl}. ${ergebnis}`;
    resultText.classList.add('pop-in');

    setTimeout(() => {
        computerIcon.classList.remove('shake');
        resultText.classList.remove('pop-in');
        document.getElementById('resultat').classList.remove('win', 'lose');
    }, 1000);
}

function getIcon(wahl) {
    if (wahl === 'schere') return '<i class="fas fa-hand-scissors"></i>';
    if (wahl === 'stein') return '<i class="fas fa-hand-rock"></i>';
    if (wahl === 'papier') return '<i class="fas fa-hand-paper"></i>';
}

function biasedChoice(playerChoice, winProbability) {
    const optionen = ['schere', 'stein', 'papier'];
    const random = Math.random();
    if (random < winProbability) {
        // Spieler gewinnt
        if (playerChoice === 'schere') return 'papier';
        if (playerChoice === 'stein') return 'schere';
        if (playerChoice === 'papier') return 'stein';
    } else {
        // Computer gewinnt
        if (playerChoice === 'schere') return 'stein';
        if (playerChoice === 'stein') return 'papier';
        if (playerChoice === 'papier') return 'schere';
    }
    return optionen[Math.floor(Math.random() * 3)]; // Fallback
}