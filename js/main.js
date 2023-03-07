/*
    JAVASCRIPT
*/

//variabili globali
const playDom = document.getElementById('generator');
const levelDom = document.getElementById('difficulty');
const myScoreDom = document.getElementById('score');


//evento per generare la griglia in base alla difficoltà al click del pulsante play
playDom.addEventListener('click', function() {

    const level = levelDom.value;
    createNewGame(level);

});

//funzione per generare una nuova partita
function createNewGame(level) {
    myScoreDom.innerHTML = "Il tuo punteggio è: 0";

    let cells;
    let cellPerSide;
    //variabile in caso di fine partita
    let gameOver = false;

    const freeCells = [];

    switch(level) {
        case "1":
            cells = 100;
            break;
        case "2":
            cells = 81;
            break;
        case "3":
            cells = 49;
            break;
    } 
    cellPerSide = Math.sqrt(cells);
    //array delle 16 bombe causali uniche
    const bombs = generateBombList(16, cells);
    console.log(bombs);

    //creo e resetto il terreno gi gioco
    const gridDom = document.getElementById('grid');
    gridDom.innerHTML = '';
    //nascondo la scritta di info per l'utente
    const info = document.getElementById('info');
    info.classList.add('d-none');

    for (let i = 1; i <= cells; i++) {
        const currentCell = generateGridItem(cellPerSide, i);
        currentCell.addEventListener('click', function() {
            if (!gameOver) {
                //SE clicco su una bomba
                if (bombs.includes(i)) {
                    this.classList.add('clicked-bomb');
                    gameOver = true;
                    discoverBombs(bombs);
                    myScoreDom.innerHTML = "Mi dispiace, HAI PERSO, il tuo punteggio è di: " + freeCells.length;
                } else {
                    this.classList.add('clicked');

                    if (!freeCells.includes(i)) {
                        freeCells.push(i);
                    }
                    const checkWinner = checkWin(freeCells, cells);
                    if (checkWinner) {
                        myScoreDom.innerHTML = "Complimenti, HAI VINTO, con punteggio di: " + freeCells.length;
                    } else {
                        myScoreDom.innerHTML = "Il tuo punteggio è: " + freeCells.length;
                    }
                }
            }           
        });
        gridDom.append(currentCell);
    }

}

//funzione per verificare se ha vinto
function checkWin(freeCells, cells) {
    const maxFreeCell = cells - 16;
    if (freeCells.length == maxFreeCell) {
        return true;
    } else {
        return false;
    }
}

//Funzione per mostrare tutte le bombe quando ne clicco una
function discoverBombs(bombs) {
    //creo un array con tutti i numeri della griglia
    const squaresDom = document.getElementsByClassName('ms_square');
    //CICLO tutti i numeri e a quelli che sono contenuti nell'array delle bombe li mostro
    for (let i = 0; i < squaresDom.length; i++) {
        if (bombs.includes((i + 1))) {
            squaresDom[i].classList.add('clicked-bomb');
        }
    }
}

//Funzione per generare l'array delle bombe
function generateBombList(numberOfBombs, cellNumber) {
    //array contenente la lista delle bombe
    const bombs = [];
    //ciclo per generare le bombe
    for (let i = 0; i < numberOfBombs; i++) {
        bombs.push(generateRandomUniqueNumber(bombs, 1, cellNumber));
    }
    return bombs;
}

//Funzione per generare un numero casuale UNICO
function generateRandomUniqueNumber(blacklist, min, max) {

    let valid = false;
    let randomNumber;
    //SE non è valido ripeto il ciclo
    while(!valid) {
        randomNumber = generateRandomNumber(min, max);
        //condizione di uscita dal ciclo
        if (!blacklist.includes(randomNumber)) {
            valid = true;
        }
    }
    return randomNumber;
}
 
//Funzione per generare un numero casuale
function generateRandomNumber(min, max) {
    const numeroCasuale = Math.floor(Math.random() * (max - min +1)) + min;
    return numeroCasuale;
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




