let moves = [];
let currentMove = 0;
let pulledMoves = [];
let pulledCurrentMove = 0;
let pulledN;

const N = field.querySelector('.row').childElementCount; // length of square side

const undoButt = document.querySelector('.undo-btn');
const redoButt = document.querySelector('.redo-btn');
const restartButt = document.querySelector('.restart-btn');
const wonTitle = document.querySelector('.won-title');
const wonMsg = document.querySelector('.won-message');

function disableButton(button) {
  button.disabled = true;
  button.style.cursor = 'not-allowed';
}

function enableButton(button) {
  button.disabled = false;
  button.style.cursor = 'pointer';
}

function removeWinTitle() {
  wonTitle.classList.add('hidden');
  wonMsg.innerText = '';
}

function showWinTitle(playerWon) {
  wonTitle.classList.remove('hidden');
  restartButt.style.cursor = 'pointer';
  if (playerWon) {
    wonMsg.innerText = (playerWon === 'ch') ? 'Crosses won!' : 'Toes won!';
  } else {
    wonMsg.innerText = 'It\'s a draw!';
  }
}

function removeWinCells() {
  const winCells = Object.values(field.querySelectorAll('.win'));

  winCells.forEach((cell) => {
    cell.classList.remove('win');
    cell.classList.remove('horizontal');
    cell.classList.remove('vertical');
    cell.classList.remove('diagonal-right');
    cell.classList.remove('diagonal-left');
  });
}

const newMove = (cellId) => {
  return {
    cellId,
    player: (moves.length % 2) ? 'r' : 'ch',
  };
};

function getWinningRowIndex() {
  const rows = Object.values(field.querySelectorAll('.row'));
  let winRow = null;

  rows.forEach((row, ind) => {
    const cells = Object.values(row.childNodes);
    const rowWon = cells.every(cell => cell.classList.contains('ch')) || cells.every(cell => cell.classList.contains('r'));
    if (rowWon) {
      winRow = ind;
    }
  });

  return winRow;
}

function getWinningColumnIndex() {
  for (let i = 0; i < N; i += 1) {
    const cellsCh = [];
    const cellsR = [];
    for (let j = 0; j < N; j += 1) {
      const cell = field.querySelector(`#c-${(j * N) + i}`);
      cellsCh.push(cell.classList.contains('ch'));
      cellsR.push(cell.classList.contains('r'));
    }
    if (cellsCh.every(e => e)) {
      return i;
    }
    if (cellsR.every(e => e)) {
      return i;
    }
  }
  return null;
}

function checkFirstDiagonale() {
  const cellsCh = [];
  const cellsR = [];
  for (let i = 0; i < N * N; i += N + 1) {
    const cell = field.querySelector(`#c-${i}`);
    cellsCh.push(cell.classList.contains('ch'));
    cellsR.push(cell.classList.contains('r'));
  }
  if (cellsCh.every(e => e)) {
    return true;
  }
  if (cellsR.every(e => e)) {
    return true;
  }
  return null;
}

function checkSecondDiagonale() {
  const cellsCh = [];
  const cellsR = [];
  for (let i = N - 1; i < (N * N) - 1; i += N - 1) {
    const cell = field.querySelector(`#c-${i}`);
    cellsCh.push(cell.classList.contains('ch'));
    cellsR.push(cell.classList.contains('r'));
  }
  if (cellsCh.every(e => e)) {
    return true;
  }
  if (cellsR.every(e => e)) {
    return true;
  }
  return null;
}

function checkWin() {
  const rowIndex = getWinningRowIndex();
  const columnIndex = getWinningColumnIndex();
  const firstDiag = checkFirstDiagonale();
  const secondDiag = checkSecondDiagonale();

  return columnIndex !== null || rowIndex !== null || firstDiag || secondDiag;
}

function gameOver() {
  let direction;
  let winCells = [];

  const rowIndex = getWinningRowIndex();
  const columnIndex = getWinningColumnIndex();
  const firstDiag = checkFirstDiagonale();
  const secondDiag = checkSecondDiagonale();

  if (rowIndex !== null) {
    direction = 'horizontal';
    const rows = Object.values(field.querySelectorAll('.row'));
    const row = rows[rowIndex];
    winCells = Object.values(row.childNodes);
  }

  if (columnIndex !== null) {
    direction = 'vertical';
    for (let i = columnIndex; i < N * N; i += N) {
      const cell = field.querySelector(`#c-${i}`);
      winCells.push(cell);
    }
  }

  if (firstDiag) {
    direction = 'diagonal-right';
    for (let i = 0; i < N * N; i += N + 1) {
      const cell = field.querySelector(`#c-${i}`);
      winCells.push(cell);
    }
  }

  if (secondDiag) {
    direction = 'diagonal-left';
    for (let i = N - 1; i < (N * N) - 1; i += N - 1) {
      const cell = field.querySelector(`#c-${i}`);
      winCells.push(cell);
    }
  }

  winCells.forEach((cell) => {
    cell.classList.add('win');
    cell.classList.add(direction);
  });

  const playerWon = winCells[0].classList.contains('ch') ? 'ch' : 'r';
  showWinTitle(playerWon);
}

function clearField() {
  const cells = Object.values(field.querySelectorAll('.cell'));
  cells.forEach(cell => cell.classList.remove('ch'));
  cells.forEach(cell => cell.classList.remove('r'));
}

function render() {
  moves = [];
  currentMove = 0;
  clearField();
  removeWinCells();
  removeWinTitle();

  if (pulledN !== N) {
    return;
  }
  for (let i = 0; i < pulledMoves.length; i += 1) {
    const event = new CustomEvent('click', {
      bubbles: true,
      detail: {
        custom: true,
      },
    });
    field.querySelector(`#c-${pulledMoves[i].cellId}`).dispatchEvent(event);
  }

  for (let i = pulledMoves.length; i > pulledCurrentMove; i -= 1) {
    const event = new CustomEvent('click', {
      bubbles: true,
      detail: {
        custom: true,
      },
    });
    undoButt.dispatchEvent(event);
  }

  checkWin();
}

function pullFromStorage() {
  pulledMoves = JSON.parse(localStorage.getItem('moves'));
  pulledCurrentMove = JSON.parse(localStorage.getItem('currentMove'));
  pulledN = JSON.parse(localStorage.getItem('N'));
}

function removeCellPlayerClass() {
  const move = moves[currentMove];
  const cell = document.querySelector(`#c-${move.cellId}`);
  cell.classList.remove(move.player);
}

function addCellPlayerClass() {
  const move = moves[currentMove];
  const cell = document.querySelector(`#c-${move.cellId}`);
  cell.classList.add(move.player);
}

function pushToStorage() {
  localStorage.setItem('moves', JSON.stringify(moves));
  localStorage.setItem('N', JSON.stringify(N));
  localStorage.setItem('currentMove', JSON.stringify(currentMove));
}

function doRestart() {
  removeWinTitle();
  removeWinCells();
  disableButton(undoButt);
  disableButton(redoButt);
  clearField();
  moves = [];
  currentMove = 0;
}

field.addEventListener('click', (e) => {
  const clickOnActiveCell = e.target.classList.contains('cell') && wonTitle.classList.contains('hidden');
  if (!clickOnActiveCell) {
    return;
  }

  moves.length = currentMove; // delete all posible redo moves
  moves.push(newMove(e.target.dataset.id));

  addCellPlayerClass();
  enableButton(undoButt);
  disableButton(redoButt);

  currentMove += 1;
  if (currentMove === N * N) {
    showWinTitle();
  }
  if (checkWin()) {
    gameOver();
  }

  if (!e.detail.custom) {
    pushToStorage();
  }
});

undoButt.addEventListener('click', (e) => {
  currentMove -= 1;

  removeCellPlayerClass();
  removeWinTitle();
  removeWinCells();
  enableButton(redoButt);

  if (!currentMove) {
    disableButton(undoButt);
  }

  if (!e.detail.custom) {
    pushToStorage();
  }
});

redoButt.addEventListener('click', (e) => {

  addCellPlayerClass();
  enableButton(undoButt);

  currentMove += 1;
  if (currentMove === moves.length) {
    disableButton(redoButt);
  }
  if (currentMove === N * N) {
    showWinTitle();
  }
  if (checkWin()) {
    gameOver();
  }

  if (!e.detail.custom) {
    pushToStorage();
  }
});

restartButt.addEventListener('click', () => {
  doRestart();
  localStorage.clear();
});

window.addEventListener('storage', (e) => {
  if (e.key === null) {
    doRestart();
    return;
  }
  if (e.key === 'currentMove') {
    pullFromStorage();
    render();
  }
});

try {
  pullFromStorage();
  render();
} catch (error) {
  if (error instanceof TypeError) {
    console.log('ERROR: TypeError occured at initial render (probably no previously saved data on localStorage)');
  } else {
    throw error;
  }
}

