// Define player and chips variables
let player = {
    name: "Chips",
  };
  
 export let chips = [
    localStorage.getItem("chips") ? parseInt(localStorage.getItem("chips")) : 200,
  ];
  
  // Function to initialize the chip counter and interval functionality
  export function addChips() {
    let counterEl = document.getElementById("counter-el");
    let counter = 10; // Tiempo en segundos
  
    // Incrementar chips cada minuto
    setInterval(function () {
      chips[0] += 10; // Incrementar chips en 10 cada minuto
      playerEl.textContent = player.name + ": £" + chips[0];
      counter = 10; // Reiniciar el contador a 60 segundos
      localStorage.setItem("chips", chips[0]); // Actualizar localStorage
    }, 10000); // Cambia a 60000 milisegundos para 1 minuto
  
    // Actualizar el contador cada segundo
    setInterval(function () {
      if (counter > 0) {
        counter--; // Decrementar el contador
        counterEl.textContent = "Next chips in: " + counter + "s";
      }
    }, 1000); // 1000 milisegundos = 1 segundo
  
    // Actualizar el elemento con el nombre del jugador y chips actuales
    let playerEl = document.getElementById("player-el");
    playerEl.textContent = player.name + ": £" + chips[0];
  }
  