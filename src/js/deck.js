export let deckId = null;
export let drawnCards = [];

// Función para crear una nueva baraja
export function createDeck() {
  const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
  fetch(url)
    .then(response => response.json())
    .then(data => {
      deckId = data.deck_id;
      console.log(`Deck ID: ${deckId}`);
    })
    .catch(error => console.error('Error al crear la baraja:', error));
}

// Inicializa el mazo y luego dibuja las cartas
export function initializeDeck() {
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        deckId = data.deck_id;
        console.log(`Deck ID: ${deckId}`);
        drawMultipleCards(20);
        // cambiar luego para poder tener mas cartar 
      } else {
        console.error('No se pudo inicializar el mazo.');
      }
    })
    .catch(error => console.error('Error al inicializar el mazo:', error));
}

// Función para dibujar cartas
export function drawCard(count) {
  if (!deckId) {
    console.error('No hay deck ID disponible.');
    return;
  }
  const drawUrl = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`;
  return fetch(drawUrl)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        data.cards.forEach(card => {
          drawnCards.push(card);
          
        });
        console.log(`Cartas dibujadas: ${data.cards.map(card => `${card.value} of ${card.suit}`).join(', ')}`);
      } else {
        console.error('No se pudo dibujar una carta.');
        console.error(cards);
      }
    })
    .catch(error => console.error('Error al dibujar la carta:', error));
}

// Dibujar múltiples cartas
export function drawMultipleCards(count) {
  const promises = [];
  for (let i = 0; i < count; i++) {
    promises.push(drawCard(1));
  }
  Promise.all(promises).then(() => {
    console.log(`Total de cartas disponibles: ${drawnCards.length}`);
  });
}

// Función para obtener una carta aleatoria del mazo sin repetición
export function getRandomCard() {
  if (drawnCards.length === 0) {
    console.error('No hay cartas disponibles. Debes llamar a drawCard primero.');
    return null;
  }
  const randomIndex = Math.floor(Math.random() * drawnCards.length);
  const randomCard = drawnCards.splice(randomIndex, 1)[0];
  return randomCard;
}
