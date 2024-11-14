import chipImage from '../img/chip.png';
import { chips } from './counterChips';

// Definir la función bet y hacerla global


export function getbetAmount() {
    return betAmount;
}

export function setbetAmount(value) {
    betAmount = value;
}


document.getElementById("img-chips").style.display = "none";
document.getElementById("img-chips").classList.add("center");


export function createBetButtons() {
    const betButtonsData = [
        { id: 'bet-five-btn', value: 5 },
        { id: 'bet-ten-btn', value: 10 },
        { id: 'bet-twentyfive-btn', value: 25 },
        { id: 'bet-fifty-btn', value: 50 },
        { id: 'bet-hundred-btn', value: 100 },
        { id: 'bet-twofifty-btn', value: 10000 }
    
    ];

    const betButtonsSection = document.getElementById('bet-buttons');

    betButtonsData.forEach(buttonData => {
        const betButtonDiv = document.createElement('div');
        betButtonDiv.className = 'bet-button';
        betButtonDiv.id = buttonData.id;
        betButtonDiv.setAttribute('onclick', `bet(${buttonData.value})`);
        
        const imgChip = document.createElement('img');
        imgChip.src = chipImage;
        imgChip.alt = `Bet ${buttonData.value}`;
        imgChip.className = 'chip-image';

        const betValueSpan = document.createElement('span');
        betValueSpan.textContent = buttonData.value;
        betValueSpan.className = 'bet-value';

        betButtonDiv.appendChild(imgChip);
        betButtonDiv.appendChild(betValueSpan);
        betButtonsSection.appendChild(betButtonDiv);
    });
}

// Función para realizar una apuesta

window.bet = function(value) {
    console.log("Chips remaining:", chips[0]); // Para verificar los chips restantes
    console.log("Current bet amount:", betAmount); // Para verificar el valor de betAmount
    console.log("bet function called with value:", value); // Para verificar la llamada a la función

    const PlaceBet = document.querySelector(".PlaceBet");
    PlaceBet.classList.add("PlaceBetOut");
    PlaceBet.addEventListener(
      "transitionend",
      () => {
        PlaceBet.style.display = "none";
      },
      { once: true }
    );
    // Verificar si tienes suficientes fichas para la apuesta
    if (chips[0] >= value) {
        const startingChips = chips[0]; // Valor inicial antes de la apuesta

        // Restar el valor apostado de chips
        chips[0] -= value;

        // Sumar el valor de la apuesta al total de la apuesta
        betAmount += value;

        // Guardar el valor actualizado en localStorage
        localStorage.setItem("chips", chips[0]);

        // Actualizar la visualización de la apuesta principal
        createBetImage(betAmount);

        // Actualizar visualización de chips restantes con animación
        animateChipsChange(startingChips, chips[0], 1000);
        console.log("Chips remaining:", chips[0]); // Para verificar los chips restantes
        console.log("Current bet amount:", betAmount); // Para verificar el valor de betAmount
    } else {
        alert("Not enough chips to place this bet!");
    }
    document.getElementById("startGame").style.display = "flex";
    document.getElementById("cleanBet").style.display = "flex";
    
document.getElementById("img-chips").style.display = "flex";
};


// Función para limpiar la apuesta
window.cleanBet = function() {
    const currentBet = getbetAmount();

    // Restablecer el total de la apuesta a 0
    setbetAmount(0);
    createBetImage(0);

    // Devolver la apuesta al total de chips
    chips[0] += currentBet;
    localStorage.setItem("chips", chips[0]);

    const playerEl = document.getElementById("player-el");
    playerEl.textContent = `Chips: £${chips[0]}`;
};

// Suponiendo que getbetAmount y setbetAmount ya están importados en este archivo


export let betAmount = 0;

export function getBetAmount() {
    return betAmount;
}

export function setBetAmount(value) {
    betAmount = value;
}

export function createBetImage(value) {
    const imgChipsDiv = document.getElementById('img-chips');

    const betContainer = document.createElement('div');
    betContainer.className = 'bet-button';

    const betImage = document.createElement('img');
    betImage.src = chipImage;
    betImage.alt = 'Bet Image';
    betImage.className = 'chip-image';

    const betSumSpan = document.createElement('span');
    betSumSpan.textContent = value;
    betSumSpan.className = 'bet-value';

    betContainer.appendChild(betImage);
    betContainer.appendChild(betSumSpan);

    imgChipsDiv.innerHTML = '';
    imgChipsDiv.appendChild(betContainer);
}

// Función para animar el cambio en la cantidad de chips
export function animateChipsChange(start, end, duration) {
    const playerEl = document.getElementById("player-el"); // Seleccionar el elemento del jugador
    let range = end - start;
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = timestamp - startTime;
        let increment = Math.min(progress / duration, 1); // Calcula el progreso en función de la duración
        let current = Math.floor(start + range * increment); // Actualiza el número actual
        playerEl.textContent = `Chips: £${current}`;

        if (progress < duration) {
            window.requestAnimationFrame(step); // Continuar la animación
        } else {
            playerEl.textContent = `Chips: £${end}`; // Asegurarse de mostrar el número final exacto
            chips[0] = end; // Actualizar el valor de chips a su valor final
            localStorage.setItem("chips", chips[0]); // Guardar en localStorage
        }
    }
    window.requestAnimationFrame(step);
}



