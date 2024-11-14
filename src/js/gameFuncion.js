import { getRandomCard, drawCard, drawnCards } from './deck.js';
import { getbetAmount, setbetAmount,createBetImage } from './bet.js';
import { updateChips } from './counterChips.js';
import toastr from 'toastr';
import '../css/cards.css';
import { betAmount } from './bet.js'
import 'toastr/build/toastr.min.css'; // Asegúrate de importar el CSS también si es necesario
export let cards = [];
export let hasBlackJack = false;
export let isAlive = false;
export let sum = 0;
//let betAmount = 10; // Valor inicial o carga desde el almacenamiento si es necesario

// we declare style none on that way we can see the button 
document.getElementById("newCard").style.display = "none";
document.getElementById("doubleBet").style.display = "none";
document.getElementById("stand").style.display = "none";
document.getElementById("startGame").style.display = "none";
document.getElementById("cleanBet").style.display = "none";


let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerDealer = document.getElementById("player-dealer");


console.log(cards)
//console.log(betAmount)
let totalBetAmount = 0

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
    // Mostrar botones de control y ocultar algunos elementos
    document.getElementById("doubleBet").style.display = "flex";
    document.getElementById("startGame").style.display = "none";
    document.getElementById("newCard").style.display = "flex";
    document.getElementById("stand").style.display = "flex";
    document.getElementById("bet-buttons").style.display = "none";
    // betImage.classList.remove("spinAndDisappear");
    document.getElementById("cleanBet").style.display = "none";
    
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
    if (!card) { // Verifica si card es null o undefined
        console.error("Error: card es null o undefined en calculateCardValue.");
        return 0; // Devuelve 0 o algún valor adecuado en caso de error
    }

    if (card.value === "ACE") {
        return 11; // Suponiendo que el As vale 11
    } else if (["KING", "QUEEN", "JACK"].includes(card.value)) {
        return 10; // Reyes, reinas y jotas valen 10
    } else {
        return parseInt(card.value); // Para otras cartas, usa su valor numérico
    }
}


//  sumDealer = 0;



function renderGame() {
  // esto pasa cuando presione deal esta parte es la del jugador 
    console.log('calling the render esta funcion si se esta llamando c');
    
    cardsEl.innerHTML = ""; // Limpiar las cartas anteriores
    let cardOffset = 0; // Offset para apilar las cartas

    // Mostrar todas las cartas en el array `cards`
    for (let card of cards) {
        let img = document.createElement("img");
        img.src = card.image; // Asegúrate de que card.image es correcto
        img.style.width = "150px";
        img.style.height = "150px";
        img.style.position = "absolute"; // Para asegurarse que se posicionen bien
        img.style.left = `${cardOffset}px`; // Posición inicial
        img.style.transform = `translate(${cardOffset}px, 0px)`; // Aplicar la traslación
        
        // Añadir la clase de animación
        img.classList.add("dropFromTopRight");

        // Añadir la carta al contenedor
        cardsEl.appendChild(img);
        cardOffset += 60; // Ajustar este valor para más o menos solapamiento
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
      if (sumDealer < 17) {
          let card = getRandomCard();
          
          if (card) {  // Verifica que card no sea null
              let cardValue;
              if (card.value === "ACE") {
                  cardValue = 11; 
              } else if (["KING", "QUEEN", "JACK"].includes(card.value)) {
                  cardValue = 10;
              } else {
                  cardValue = parseInt(card.value);
              }
              
              dealerCards.push(card);
              sumDealer += cardValue;
              
              renderGameDealer();
              resolve(); // Resuelve la promesa después de agregar la carta
          } else {
              console.error("Error: No se pudo obtener una carta válida.");
              resolve(); // Resuelve la promesa incluso si falla para evitar un bloqueo
          }
      } else {
          resolve(); // Si sumDealer es 17 o más, resuelve la promesa sin agregar carta
      }
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
  let cardOffset = 0; // Offset para apilar las cartas
  sumDealer = 0; // Reiniciar la suma del dealer
  
  // Iterar sobre las cartas del dealer y renderizarlas
  for (let card of dealerCards) {
      let img = document.createElement("img");
      img.src = card.image;
      img.style.width = "150px";
      img.style.height = "150px";
      img.style.top = `0px`;
      img.style.left = `${cardOffset}px`; // Posición inicial
      img.style.transform = `translate(${cardOffset}px, 0px)`; // Aplicar la transformación
      img.classList.add("dropFromTopRight");
      // cardDel.style.marginTop = `50px`;
    
      
      cardDel.appendChild(img);
      sumDealer += calculateCardValue(card);
      cardOffset += 10; // Ajusta este valor para más o menos solapamiento
  }
  
  // Mostrar `sumDealer` solo si es mayor que cero
  playerDealer.textContent = sumDealer > 0 ? sumDealer : "";

  // Mostrar mensajes si el dealer pierde o gana con Blackjack
  if (sumDealer > 21) {
      messageDealer.textContent = "Dealer Busted!";
  } else if (sumDealer === 21) {
      messageDealer.textContent = "Dealer got Blackjack!";
  }
  
  console.log(dealerCards); // Verificar que hay cartas en el dealer antes de renderizar
}


  console.log(dealerCards); // Verifica que hay cartas en el dealer antes de renderizar
renderGameDealer();




// stand funcion 


function stand() {
    alert('dddd')
    dealerNewCard().then(() => { // Esperar a que el dealer termine de tomar cartas
      if (sum > 21) {
        // El jugador se pasa (pierde)
        message = "You Busted! Dealer Wins!";
        loseBet();
        resetGameAfterDelay() 
      } else if (sumDealer > 21) {
        // El dealer se pasa (gana el jugador)
        message = "Dealer Busted! You Win!";
        winBet();
      } else if (sum > sumDealer) {
        // El jugador gana
        message = "You Win!";
        winBet();
      } else if (sum < sumDealer) {
        // El dealer gana
        message = "Dealer Wins!";
        loseBet();
        resetGameAfterDelay() 
      } else {
        // Empate
        message = "It's a tie!";
        //chips[0] += betAmount; // Devolver la apuesta original en caso de empate
      }
      
      messageEl.textContent = message;
      isAlive = false;
      //resetGameAfterDelay(); // Reiniciar el juego después de 3 segundos
  
    });
  }

  window.stand = stand;


  function resetGameAfterDelay() {
    setTimeout(function () {
      cards = [];
      dealerCards = [];
      sum = 0;
      sumDealer = 0;
      messageEl.textContent = "";
      cardsEl.textContent = "";
      sumEl.textContent = "";
      cardDel.textContent = "";
      playerDealer.textContent = "";
      messageDealer.textContent = "";
      document.getElementById("doubleBet").style.display = "none"; // Ocultar el botón de doblar apuesta
      document.getElementById("newCard").style.display = "none";
      document.getElementById("stand").style.display = "none";
      document.getElementById("bet-buttons").style.display = "none";
      document.getElementById("bet-buttons").style.display = "block";
      // //inicialColor();
      document.getElementById("cleanBet").style.display = "flex"; // Mostrar el botón de limpiar apuesta
      document.getElementById("startGame").style.display = "flex";
      sumEl.classList.remove("sum");
      playerDealer.classList.remove("sumDel");
    }, 99000);
    // el delay de 6000 es los segundos que tienen que pasar para render de game again 
  }
  //  document.getElementById("player-dealer").classList.display = "none";
  
  // newCArd


  
  // document.getElementById("newCard").style.display = "block";
  let message = document.getElementById("message-el");
  let hasDrawnCard = false;
  let lastCard = cards[cards.length - 2];
  function newCard() {
    drawCard();
    if (isAlive === true && hasBlackJack === false) {
      let card = getRandomCard();
      // Sumar el valor de la nueva carta a la suma total
      let cardValue = calculateCardValue(card);
      sum += cardValue;
      // Agregar la nueva carta al array de cartas
      cards.push(card);
      hasDrawnCard = true;
      // Añadir la nueva carta visualmente
      let lastCard = cards[cards.length - 3]; // Usar la última carta
      let img = document.createElement("img");
      img.src = lastCard.image;
      img.style.width = "150px";
      img.style.height = "150px";
      img.style.top = `0px`;
      img.style.marginLeft = `50px`;
      img.style.left = `${(cards.length - 3) * 50}px`; // Ajustar la posición de acuerdo con la cantidad de cartas
      img.style.transform = `translate(${(cards.length - 1) * 30}px, 0px)`; // Aplicar la traslación
      img.classList.add("dropFromTopRight"); // Agregar la clase de animación
      cardsEl.appendChild(img); // Agregar la nueva carta al contenedor de cartas
      // Actualizar el total de puntos
      sumEl.textContent = "" + sum;
      // Lógica para determinar el resultado del juego
      if (sum > 21) {
        message = "You Bust! Dealer Wins!";
        isAlive = false;
        loseBet();
        winBet();
        // resetGameAfterDelay();
      } else if (sum === 21) {
        message = "Blackjack!";
        hasBlackJack = true;
        isAlive = false;
        winBet();
        // resetGameAfterDelay();
      } else if (sum <= 20) {
        message = "Do You Want another card?";
      }
      messageEl.textContent = message;
    }
    // document.getElementById("doubleBet").style.display = "none";
  }
  
  window.newCard =newCard;




  function loseBet() {
   // increaseProgress();
    setTimeout(function () {
     
      //betAmount = 0; // Reiniciar `betAmount`
      setbetAmount(0);
     // updateBetDisplay(); // Reflejar en el DOM
      localStorage.setItem("chips", chips[0]); // Guardar en localStorage
      console.log("Ganaste la apuesta, fichas actualizadas: £" + chips[0]);
     // winBetEfect(); // Llamar al efecto de ganancia
    }, 9000); // Después de 3 segundos
    alert('lose')
  }
  

  

//   function updateBetDisplay() {
//     // Asegurarse de que los elementos existen en el DOM
//     if (betSum && playerEl) {
//         betSum.textContent = "£" + (betAmount || 0); // Asegúrate de que betAmount sea un número
//         playerEl.textContent = "Player: £" + (chips[0] || 0); // Asegúrate de que chips[0] sea un número
//     } else {
//         console.error("betSum o playerEl no están definidos en el DOM.");
//     }
// }

  let chips = [parseInt(localStorage.getItem("chips")) || 100]; // Usar un valor inicial
let betSum = document.getElementById("bet-sum");
let playerEl = document.getElementById("player-el");


// function loseBet() {
//     // setTimeout(function () {
//     //     // setbetAmount(0);
//     //     // createBetImage(0);
//     //     // chips[0] += currentBet;
//     //     // localStorage.setItem("chips", chips[0]);
    
//     //     // const playerEl = document.getElementById("player-el");
//     //     // playerEl.textContent = `Chips: £${chips[0]}`;
//     //     // updateBetDisplay(); // Reflejar en el DOM
//     //     // console.log("Perdiste la apuesta");
        
//     // }, 1000);
//     // setTimeout(function () {
//     //     let winnings = betAmount * 2; // Ganancias (el doble de la apuesta)
//     //     chips[0] += winnings; // Agregar las ganancias a `chips`
//     //     betAmount = 0; // Reiniciar `betAmount`
//     //     updateBetDisplay(); // Reflejar en el DOM
//     //     localStorage.setItem("chips", chips[0]); // Guardar en localStorage
//     //     console.log("Ganaste la apuesta, fichas actualizadas: £" + chips[0]);
//     //    // winBetEfect(); // Llamar al efecto de ganancia
//     //   }, 3000); // Después de 3 segundos
//     //   alert('lose')
   
// }


// Suponiendo que getbetAmount y setbetAmount ya están importados en este archivo
// function loseBet() {
//     setTimeout(function () {
//         let winnings = getbetAmount() * 2; // Ganancias: el doble de la apuesta
//         chips[0] += winnings; // Agregar las ganancias a `chips`
//         setbetAmount(0); // Reiniciar `betAmount` usando el setter
//         updateBetDisplay(); // Reflejar en el DOM
//         localStorage.setItem("chips", chips[0]); // Guardar en localStorage
//         console.log("Ganaste la apuesta, fichas actualizadas: £" + chips[0]);
//        // winBetEfect(); // Llamar al efecto de ganancia, si existe
//     }, 3000); // Después de 3 segundos

//     alert('lose');
// }

window.winBet = function() {
  const currentBet = getbetAmount(); // Asegúrate de que getbetAmount está importado
  const newChipsAmount = chips[0] + currentBet; // Calcula el nuevo valor
  updateChips(newChipsAmount); // Actualiza y guarda en localStorage
  createBetImage(0); // Resetea la imagen de apuesta a 0
  setbetAmount(0);
  resetGameAfterDelay() 
  alert('lose from lose bet');
  
};
