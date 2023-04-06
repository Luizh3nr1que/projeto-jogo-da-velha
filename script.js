//dados iniciais

let square = {
    a1: '', a2: '', a3: '',

    b1: '', b2: '', b3: '',

    c1: '', c2: '', c3: '',
};

let player = '';

let warning = '';

let playing = false;

//eventos
document.querySelector('.iniciar').addEventListener('click', iniciar)
document.querySelector('.reset').addEventListener('click', reset);
document.querySelector(`div[data-item=a1]`).addEventListener('click', itemClick);
document.querySelector(`div[data-item=a2]`).addEventListener('click', itemClick);
document.querySelector(`div[data-item=a3]`).addEventListener('click', itemClick);
document.querySelector(`div[data-item=b1]`).addEventListener('click', itemClick);
document.querySelector(`div[data-item=b2]`).addEventListener('click', itemClick);
document.querySelector(`div[data-item=b3]`).addEventListener('click', itemClick);
document.querySelector(`div[data-item=c1]`).addEventListener('click', itemClick);
document.querySelector(`div[data-item=c2]`).addEventListener('click', itemClick);
document.querySelector(`div[data-item=c3]`).addEventListener('click', itemClick);




//funçoes

function reset() {
    warning = '';

    let random = Math.floor(Math.random() * 2);
    if (random === 0) {
        player = 'X';
    } else {
        player = 'O';
    }

    for (let i in square) {
        square[i] = '';
    }

    playing = true;

    renderSquare();
    renderInfo();
}

function iniciar() {
    let random = Math.floor(Math.random() * 2);
    if (random === 0) {
        player = 'X';
    } else {
        player = 'O';
    }



    playing = true;

    renderSquare();
    renderInfo();
}

function renderSquare() {
    for (let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`)
        item.innerHTML = square[i]

    }


    checkGame();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if (playing && square[item] === '') {
        square[item] = player;
        renderSquare();
        togglePlayer();
    }
}


function togglePlayer() {
    if (player === 'X') {
        player = 'O';
    } else {
        player = 'X';
    }
    renderInfo();
}

function checkGame() {
    if (checkWinnerFor('X')) {
        warning = 'O "x" venceu ';
        playing = false;
    } else if (checkWinnerFor('O')) {
        warning = 'O "o" venceu';
        playing = false
    } else if (isFull()) {
        warning = 'Deu Empate'
        playing = false
    } else {

    }
}

function checkWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1',

    ];

    for (let w in pos) {
        let pArray = pos[w].split(',');
        let hasWon = pArray.every(option => square[option] === player);
        if (hasWon) {
            return true;
        }

    }
    return false;
}


function isFull() {
    for (let i in square) {
        if (square[i] === '') {
            return false;
        }
    }
    return true;
}