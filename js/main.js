/*
    JAVASCRIPT
*/

//identifico il pulsante per generare la griglia
const playDom = document.getElementById('generator');
//identifico la scelta dell'utente
const levelDom = document.getElementById('difficulty');

//evento per generare la griglia in base alla difficoltà al click del pulsante play
playDom.addEventListener('click', function() {

    const level = levelDom.value;
    createNewGame(level);

});

//funzione per generare una nuova partita
function createNewGame(level) {
    let cells;
    let cellPerSide;

    switch(level) {
        //Se l'utente ha selezionato la difficoltà 1  la griglia dovrà contenere 100 square 
        case "1":
            cells = 100;
            break;
        //Se l'utente ha selezionato la difficoltà 2  la griglia dovrà contenere 81 square 
        case "2":
            cells = 81;
            break;
        //Se l'utente ha selezionato la difficoltà 3  la griglia dovrà contenere 49 square 
        case "3":
            cells = 49;
            break;
    }
    //calcolo la radice quadrata del numero totale delle celle per sapere quante celle sul lato x e quante sul lato y
    cellPerSide = Math.sqrt(cells);

    generatePlayground(cells, cellPerSide);
}

//funzione per generare la griglia contenente i quadrati
function generatePlayground(cellsNumber, cellPerSide) {
    const gridDom = document.getElementById('grid');
    //resetto l'innerHTML di grid
    gridDom.innerHTML = '';
    const info = document.getElementById('info');
    //nascondo la scritta di info per l'utente
    info.classList.add('d-none');

    //ciclo di creazione del numero di quadrati necessari in base alla difficoltà
    for (let i = 1; i <= cellsNumber; i++) {
        //definisco il quadrato corrente 
        const currentCell = generateGridItem(cellPerSide, i);
        //evento per cambiare lo sfondo al quadrato quando lo clicco
        currentCell.addEventListener('click', function() {
            this.classList.toggle('ms_clicked');
            console.log('hai cliccato sul numero', i);
        });
        //inserisco il quadratino creato nella griglia
        gridDom.append(currentCell);
    }
}

//funzione per generare il singolo quadrato
function generateGridItem(cellPerSide, number) {
    const cell = document.createElement('div');
    cell.classList.add('ms_square');
    cell.style.width = `calc(100% / ${cellPerSide})`;
    cell.style.height = `calc(100% / ${cellPerSide})`;
    cell.innerHTML = `<div class="cell-number">${number}</div>`;

    return cell;
}