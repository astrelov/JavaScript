let moves = [];
let currentMove = 0;

const gameField = document.querySelector('.field');
const undoButt = document.querySelector('.undo-btn');
const redoButt = document.querySelector('.redo-btn');
const restartButt = document.querySelector('.restart-btn');
const wonTitle = document.querySelector('.won-title');
const wonMsg = document.querySelector('.won-message');

const SIDE = gameField.querySelectorAll('.row').length; // length of square side

function cellsSetLinesDataAttr() {
  const cells = gameField.querySelectorAll('.cell');

  cells.forEach((cell) => {
    const id = parseInt(cell.dataset.id, 10);
    const column = id % SIDE;
    let row = 0;
    let diag0 = false;
    let diag1 = false;

    for (let i = id - SIDE; i >= 0; i -= SIDE) {
      row += 1;
    }

    for (let i = 0; i < SIDE * SIDE; i += SIDE + 1) {
      if (id === i) {
        diag0 = true;
      }
    }

    for (let i = SIDE - 1; i < (SIDE * SIDE) - 1; i += SIDE - 1) {
      if (id === i) {
        diag1 = true;
      }
    }

    cell.dataset.row = row.toString();
    cell.dataset.column = column.toString();
    cell.dataset.diag0 = diag0.toString();
    cell.dataset.diag1 = diag1.toString();
  });
}

function disableButton() {
  this.disabled = true;
  this.style.cursor = 'not-allowed';
}

function enableButton() {
  this.disabled = false;
  this.style.cursor = 'pointer';
}

function hideWinTitle() {
  wonTitle.classList.add('hidden');
}

function showWinTitle(isDraw) {
  wonTitle.classList.remove('hidden');
  restartButt.style.cursor = 'pointer';

  if (isDraw) {
    wonMsg.innerText = 'It\'s a draw!';
  } else {
    wonMsg.innerText = currentMove % 2 ? 'Crosses won!' : 'Toes won!';
  }
}

function clearWinCells() {
  const winCells = gameField.querySelectorAll('.win');

  winCells.forEach((cell) => {
    cell.classList.remove('win', 'horizontal', 'vertical', 'diagonal-right', 'diagonal-left');
  });
}

function getWinner() {
  const currCell = gameField.querySelector(`#c-${moves[currentMove - 1]}`);
  const player = currentMove % 2 ? 'ch' : 'r';
  const cellsInRow = Object.values(gameField.querySelectorAll(`[data-row='${currCell.dataset.row}']`));
  const cellsInCol = Object.values(gameField.querySelectorAll(`[data-column='${currCell.dataset.column}']`));

  if (cellsInRow.every(cell => cell.classList.contains(player))) {
    return {
      line: 'row',
      index: currCell.dataset.row,
      toAddClass: 'horizontal',
    };
  }

  if (cellsInCol.every(cell => cell.classList.contains(player))) {
    return {
      line: 'column',
      index: currCell.dataset.column,
      toAddClass: 'vertical',
    };
  }

  if (currCell.dataset.diag0 === 'true') {
    const cellsInDiag = Object.values(gameField.querySelectorAll('[data-diag0=\'true\']'));
    if (cellsInDiag.every(cell => cell.classList.contains(player))) {
      return {
        line: 'diag0',
        index: 'true',
        toAddClass: 'diagonal-right',
      };
    }
  }
  if (currCell.dataset.diag1 === 'true') {
    const cellsInDiag = Object.values(gameField.querySelectorAll('[data-diag1=\'true\']'));
    if (cellsInDiag.every(cell => cell.classList.contains(player))) {
      return {
        line: 'diag1',
        index: 'true',
        toAddClass: 'diagonal-left',
      };
    }
  }

  if (currentMove === SIDE * SIDE) {
    return {
      line: 'draw',
    };
  }

  return null;
}

function gameOver(winner) {
  const winCells = gameField.querySelectorAll(`[data-${winner.line}='${winner.index}']`);

  if (winner.line === 'draw') {
    showWinTitle(true);
    return;
  }

  winCells.forEach(cell => cell.classList.add('win', winner.toAddClass));
  showWinTitle();
}

function clearPlayerCells() {
  const cells = gameField.querySelectorAll('.cell');
  cells.forEach(cell => cell.classList.remove('ch', 'r'));
}

function restartThisTabGame() {
  hideWinTitle();
  clearWinCells();
  clearPlayerCells();
  disableButton.call(undoButt);
  disableButton.call(redoButt);
  moves = [];
  currentMove = 0;
}

function renderPulledGame(pulledGameState) {
  restartThisTabGame();

  if (!pulledGameState || pulledGameState.SIDE !== SIDE) {
    return;
  }
  for (let i = 0; i < pulledGameState.moves.length; i += 1) {
    const event = new CustomEvent('click', {
      bubbles: true,
      detail: {
        custom: true,
      },
    });
    gameField.querySelector(`#c-${pulledGameState.moves[i]}`).dispatchEvent(event);
  }

  for (let i = pulledGameState.moves.length; i > pulledGameState.currentMove; i -= 1) {
    const event = new CustomEvent('click', {
      bubbles: true,
      detail: {
        custom: true,
      },
    });
    undoButt.dispatchEvent(event);
  }
}

function removeCellPlayerClass() {
  const id = moves[currentMove];
  const cell = document.querySelector(`#c-${id}`);
  cell.classList.remove('ch', 'r');
}

function addCellPlayerClass() {
  const id = moves[currentMove];
  const cell = document.querySelector(`#c-${id}`);
  cell.classList.add(currentMove % 2 ? 'r' : 'ch');
}

function pushGameToStorage() {
  const gameState = { moves, currentMove, SIDE };
  localStorage.setItem('gameState', JSON.stringify(gameState));
}

function pullStorageGameState() {
  return JSON.parse(localStorage.getItem('gameState'));
}

gameField.addEventListener('click', (e) => {
  const clickedActiveCell = e.target.classList.contains('cell') && wonTitle.classList.contains('hidden');
  if (!clickedActiveCell) {
    return;
  }

  moves.length = currentMove; // delete all posible redo moves
  moves.push(e.target.dataset.id);

  addCellPlayerClass();
  enableButton.call(undoButt);
  disableButton.call(redoButt);

  currentMove += 1;

  const winner = getWinner();
  if (winner) {
    gameOver(winner);
  }

  if (!e.detail.custom) {
    pushGameToStorage();
  }
});

undoButt.addEventListener('click', (e) => {
  currentMove -= 1;

  removeCellPlayerClass();
  hideWinTitle();
  clearWinCells();
  enableButton.call(redoButt);

  if (!currentMove) {
    disableButton.call(undoButt);
  }

  if (!e.detail.custom) {
    pushGameToStorage();
  }
});

redoButt.addEventListener('click', (e) => {
  addCellPlayerClass();
  enableButton.call(undoButt);

  currentMove += 1;
  if (currentMove === moves.length) {
    disableButton.call(redoButt);
  }

  const winner = getWinner();
  if (winner) {
    gameOver(winner);
  }

  if (!e.detail.custom) {
    pushGameToStorage();
  }
});

restartButt.addEventListener('click', () => {
  restartThisTabGame();
  localStorage.clear();
});

window.addEventListener('storage', () => {
  renderPulledGame(pullStorageGameState());
});

cellsSetLinesDataAttr();
renderPulledGame(pullStorageGameState());
