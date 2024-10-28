import arrowImage from '../img/arrow_downward_24dp_FILL0_wght400_GRAD0_opsz24.svg';

export  function createArrows() {
    const betButtonsSection = document.getElementById('bet-buttons');

    // Crear un div para las flechas
    const allArrowsDiv = document.createElement('div');
    allArrowsDiv.className = 'allArrows';

    // Crear y añadir las imágenes de flechas
    for (let i = 0; i < 6; i++) {
        const imgArrow = document.createElement('img');
        imgArrow.src = arrowImage; // Usa la imagen importada
        imgArrow.className = 'add5px'; // Puedes añadir más clases si es necesario
        imgArrow.alt = 'Additional Image';
        allArrowsDiv.appendChild(imgArrow);
    }

    // Añadir el div de flechas a la sección de botones de apuesta
    betButtonsSection.appendChild(allArrowsDiv);

    console.log('Another function is called');
}

