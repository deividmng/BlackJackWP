import _ from 'lodash';
import './css/style.css';
//import Icon from './tableroBJ.jpg';
import salud from './img/salud.png'; // Importa la imagen de salud
import { createArrows } from './js/arrows';
import { createBetButtons } from './js/bet'

import { addChips } from './js/counterChips';
// import { chips } from './js/counterChips';
import { betAmount, createBetImage } from './js/bet'; // Importa betAmount desde bet.js
import { startGame} from './js/gameFuncion'
import { createDeck, drawCard, getRandomCard, initializeDeck, drawMultipleCards } from  './js/deck';



createDeck();
initializeDeck();

//  function component() {
//    const element = document.createElement('div');

//   // Lodash, now imported by this script
//    element.innerHTML = _.join(['Hello', 'webpack '], ' ');
//    element.classList.add('hello');
// // en el caso de que queramos importar una img 
// //    const myIcon = new Image();
// //    myIcon.src = Icon;
 
// //    element.appendChild(myIcon);

//    return element;
//  }

//  document.body.appendChild(component());



 const imgSalud = document.createElement('img');
 imgSalud.src = salud;
 imgSalud.alt = 'Salud';
 imgSalud.classList.add('imgSalud'); // Agrega la clase aquí
 
 document.querySelector('.chips').appendChild(imgSalud);
 

//  // Suponiendo que tienes un botón o algún evento que dispara la animación
// este codigo sera para el place bet para que desaparezca
// document.getElementById('PlaceBet').addEventListener('click', function() {
//   this.classList.add('PlaceBetOut'); // Añade la clase que activa la animación
// });
   
createArrows();
createBetButtons();
createBetImage(); // Esto crea una imagen con el valor "100" dentro de #img-chips
// Llama a la función para inicializar el comportamiento de los chips y el contador
addChips();

