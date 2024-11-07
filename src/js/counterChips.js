// Define player and chips variables
let player = {
    name: "Chips",
  };
  
// Centraliza la gestión de chips
export function getChips() {
  return localStorage.getItem("chips") ? parseInt(localStorage.getItem("chips")) : 200;
}

export function updateChips(newAmount) {
  chips[0] = newAmount;
  localStorage.setItem("chips", chips[0]);
  updatePlayerDisplay(); // Actualiza el elemento visual con el nuevo valor
}

// Inicializa los chips con el valor en localStorage o 200
export let chips = [getChips()];

// Actualiza la visualización del jugador
export function updatePlayerDisplay() {
  const playerEl = document.getElementById("player-el");
  playerEl.textContent = `Chips: £${chips[0]}`;
}

// Función para incrementar chips automáticamente
export function addChips() {
  let counterEl = document.getElementById("counter-el");
  let counter = 10; // Tiempo en segundos para pruebas

  // Incrementa chips cada 10 segundos
  setInterval(function () {
    const newChipsAmount = chips[0] + 10; // Calcula el nuevo valor
    updateChips(newChipsAmount); // Actualiza y guarda en localStorage
    counter = 10; // Reinicia el contador a 10 para prueba
  }, 10000); // Cambia a 60000 para 1 minuto

  // Actualiza el contador de segundos cada segundo
  setInterval(function () {
    if (counter > 0) {
      counter--; // Decrementa el contador en cada segundo
      counterEl.textContent = "Next chips in: " + counter + "s";
    }
  }, 1000);

  // Inicializa la visualización del jugador con el valor actual de chips
  updatePlayerDisplay();
}


