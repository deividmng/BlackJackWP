import { getRandomCard, drawCard, drawnCards } from './deck.js';
import { getbetAmount, setbetAmount } from './bet.js';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css'; // Asegúrate de importar el CSS también si es necesario


export let cards = [];
export let hasBlackJack = false;
export let isAlive = false;
export let sum = 0;
let betAmount = 10; // Valor inicial o carga desde el almacenamiento si es necesario


let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerDealer = document.getElementById("player-dealer");


console.log(cards)
console.log(betAmount)

// Función de inicio del juego
// Función de inicio del juego
export function startGame() { 
    console.log(cards)
    console.log('Start Game button clicked');

    // Verifica si hay cartas disponibles
    if (drawnCards.length === 0) {
        toastr.error("No hay cartas disponibles.");
        return;
    }

    if (betAmount > 0) {
        isAlive = true;
        hasBlackJack = false;

        let firstCard = getRandomCard();
        let secondCard = getRandomCard();

        if (firstCard && secondCard) {
            cards = [firstCard, secondCard];
            sum = getCardValue(firstCard) + getCardValue(secondCard);

            console.log('First Card:', firstCard);
            console.log('Second Card:', secondCard);

            renderGame();
            dealerNewCard(); // Llama aquí para que el dealer empiece a recibir cartas
        } else {
            toastr.error("Error al obtener cartas.");
        }
    } else {
        toastr.error("Please place a bet before starting the game.");
    }
}

window.startGame = startGame; // Esto la hace accesible globalmente
// Función para obtener el valor de una carta
function getCardValue(card) {
  if (card.value === "ACE") {
    return 1;
  } else if (["KING", "QUEEN", "JACK"].includes(card.value)) {
    return 10;
  } else {
    return parseInt(card.value);
  }
}

function calculateCardValue(card) {
    if (card.value === "ACE") {
        return 11; // Suponiendo que el As vale 11
    } else if (["KING", "QUEEN", "JACK"].includes(card.value)) {
        return 10; // Reyes, reinas y jotas valen 10
    } else {
        return parseInt(card.value); // Para otras cartas, usa su valor numérico
    }
}

// sumDealer = 0;



function renderGame() {
    console.log('calling the render esta funcion si se esta llamando ');
    
    cardsEl.innerHTML = ""; // Limpiar las cartas anteriores
    let cardOffset = 0; // Offset para apilar las cartas

    // Mostrar todas las cartas en el array `cards`
    for (let card of cards) {
        let img = document.createElement("img");
        img.src = card.image; // Asegúrate de que card.image es correcto
        img.style.width = "50px";
        img.style.height = "70px";
        img.style.position = "absolute"; // Para asegurarse que se posicionen bien
        img.style.left = `${cardOffset}px`; // Posición inicial
        img.style.transform = `translate(${cardOffset}px, 0px)`; // Aplicar la traslación
        
        // Añadir la clase de animación
        img.classList.add("dropFromTopRight");

        // Añadir la carta al contenedor
        cardsEl.appendChild(img);
        cardOffset += 30; // Ajustar este valor para más o menos solapamiento
    }

    // Calcular la suma considerando el As como 1 o 11
    let aceCount = 0;
    sum = 0; // Asegúrate de usar la variable global sum
    let possibleSum = 0;
  
    // Calcular la suma total y contar los Ases
    for (let card of cards) {
        if (card.value === "ACE") {
            aceCount++;
            sum += 11; // El valor inicial del As será 11
        } else if (["KING", "QUEEN", "JACK"].includes(card.value)) {
            sum += 10; // Reyes, Reinas y Jotas valen 10
        } else {
            sum += parseInt(card.value); // Añadir el valor numérico de la carta
        }
    }
  
    // Si hay Ases, calcular también la suma alternativa donde el As valga 1
    if (aceCount > 0) {
        possibleSum = sum - 10 * aceCount; // Restar 10 por cada As para que valga 1 en vez de 11
        // Mostrar las dos posibilidades solo si la suma es menor o igual a 21
        if (sum > 21) {
            sum = possibleSum; // Si la suma con As como 11 supera 21, usar el As como 1
            possibleSum = 0; // Ya no hay una segunda posibilidad
        }
    }
  
    // Actualizar la visualización de la suma
    if (possibleSum > 0 && sum <= 21) {
        sumEl.textContent = sum + " / " + possibleSum; // Mostrar ambas posibilidades
    } else {
        sumEl.textContent = sum; // Mostrar solo la suma
    }
  
    sumEl.classList.add("sum");
    playerDealer.classList.add("sumDel");
  
    // **Aquí es donde defines la variable message**
    let message; // Declarar la variable message aquí

    // Actualizar el mensaje del jugador
    if (sum <= 20) {
        message = "Do You Want another card?";
    } else if (sum === 21) {
        message = "Blackjack!";
        hasBlackJack = true;
        isAlive = false;
      //  winBet();
      //  resetGameAfterDelay();
    } else if (sum > 21) {
        message = "You Bust! Dealer Wins!";
        isAlive = false;
        //loseBet();
       // resetGameAfterDelay();
    }
  
    // Actualizar el mensaje en el DOM
    messageEl.textContent = message;
}

  function dealerNewCard() {
    return new Promise((resolve) => { // Devolver una promesa
      let dealerIndex = 0; // Índice para controlar cuántas cartas se han añadido
  
      function addDealerCard() {
        if (sumDealer < 17) {
          let card = getRandomCard();
          
          // Convertir los valores de las cartas a números
          let cardValue;
          if (card.value === "ACE") {
            cardValue = 11; // Valor por defecto del As
          } else if (["KING", "QUEEN", "JACK"].includes(card.value)) {
            cardValue = 10; // Reyes, reinas y jotas valen 10
          } else {
            cardValue = parseInt(card.value); // Convertir el valor a número
          }
  
          dealerCards.push(card);
          sumDealer += cardValue;
  
          // Renderizar el estado actual del dealer
          renderGameDealer();
  
          // Incrementar el índice para la próxima carta
          dealerIndex++;
  
          // Llamar a la función de nuevo después de 1 segundo
          setTimeout(addDealerCard, 1000);
        } else {
          resolve(); // Resolver la promesa cuando el dealer termina de tomar cartas
        }
      }
  
      addDealerCard(); // Iniciar el proceso
    });
  }

  window.startGame = startGame; // Hacer la función accesible globalmente
  

// Dealer logic
let dealerCards = [];
let cardDel = document.getElementById("cards-dele");
let messageDealer = document.getElementById("message-dele");

let sumDealer = 0;
function renderGameDealer() {
    cardDel.innerHTML = "";
    let cardOffset = 0; // Offset for stacking cards
    sumDealer = 0; // Reiniciar la suma del dealer
    
    // Iterar sobre las cartas del dealer y renderizarlas
    for (let card of dealerCards) {
        let img = document.createElement("img");
        img.src = card.image;
        img.style.width = "50px";
        img.style.height = "70px";
        img.style.top = `0px`;
        img.style.left = `${cardOffset}px`; // Set the initial position
        img.style.transform = `translate(${cardOffset}px, 0px)`; // Apply the translation
        img.classList.add("dropFromTopRight");
        
        cardDel.appendChild(img);
        sumDealer += calculateCardValue(card);
        cardOffset += 30; // Adjust this value for more or less overlap
    }
    
    playerDealer.textContent = "" + sumDealer;
    
    if (sumDealer > 21) {
        messageDealer.textContent = "Dealer Busted!";
    } else if (sumDealer === 21) {
        messageDealer.textContent = "Dealer got Blackjack!";
    }
    
    console.log(dealerCards); // Verifica que hay cartas en el dealer antes de renderizar
}


  console.log(dealerCards); // Verifica que hay cartas en el dealer antes de renderizar
renderGameDealer();
