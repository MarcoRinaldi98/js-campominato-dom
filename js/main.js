/*
    JAVASCRIPT
*/

//identifico il pulsante per generare la griglia
const playDom = document.getElementById('generator');
//identifico la scelta dell'utente
const levelDom = document.getElementById('difficulty');

let bombs = [];

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
    
    bombs = generateBombs(cells);
    console.log(bombs);

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

            if (isNumberBomb(i) == 'valid') {
                this.classList.toggle('ms_valid');
            } else {
                this.classList.toggle('ms_bomb');
            }
            console.log('hai cliccato sul numero', i);
            console.log(bombs);
            console.log(isNumberBomb(i));
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

//funzione per generare 16 numeri unici
function generateBombs(cells) {
    let numberBlacklist = [];
    //ciclo per far uscire 16 numeri
    for (let i = 0; i < 16; i++) {
        //genero ad ogni giro del ciclo un numero a caso unico
        const newValidRandomNumber = generateUniqueRandomNumber(numberBlacklist, 1, cells);
        
        //aggiungo il numero generato nella lista dei numeri già generati
        numberBlacklist.push(newValidRandomNumber);
    }

    return numberBlacklist;
}


//funzione per generare un numero casuale tra min e max
function generateRandomNumber(min, max) {
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number;
}

//funzione per generare un numero casuale tra min e max che non sia già uscito
function generateUniqueRandomNumber(blacklist, min, max) {
    //imposto una variabile booleana a false
    let isValidNumber = false;
    let randomNumber;
    //ciclo di verifica
    while (!isValidNumber) {
        randomNumber = generateRandomNumber(min, max);
        //SE blacklist non include il randomNumber
        if (!blacklist.includes(randomNumber)) {
            isValidNumber = true;
        }
    }
    return randomNumber;
}

//funzione per capire se il numero cliccato è una bomba o no
function isNumberBomb(i) {
    if (i == bombs[0] || i == bombs[1] || i == bombs[2] || i == bombs[3] || i == bombs[4] || i == bombs[5] || i == bombs[6] || i == bombs[7] || i == bombs[8] || i == bombs[9] || i == bombs[10] || i == bombs[11] || i == bombs[12] || i == bombs[13] || i == bombs[14] || i == bombs[15]) {
        return 'bomb';
    } else {
        return 'valid';
    }
}