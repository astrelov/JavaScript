let moves = [];
let arr = [];
let movesCount = 0;
let winArray = [];

let undoButt = document.querySelector('.undo-btn');
let redoButt = document.querySelector('.redo-btn');
let restartButt = document.querySelector('.restart-btn');
let wonTitle = document.querySelector('.won-title');
let wonMsg = document.querySelector('.won-message');

function render() {
  for (let i = 0; i < 9; i++) {
    const cell = document.querySelector(`#c-${i}`);
    cell.classList.remove('r');
    cell.classList.remove('ch');
  }

  arr.forEach((e, index) => {
    const cell = document.querySelector(`#c-${index}`);
    cell.classList.add(e);
  });

  if (movesCount < moves.length) enableButton(redoButt);
  else disableButton(redoButt);

  if (movesCount) enableButton(undoButt);
  else disableButton(undoButt);

  removeWinTitle();
  removeWinCells();
  checkWin();
}

function pullFromStorage() {
  let pulled = JSON.parse(localStorage.getItem('moves'));
  if (pulled) moves = pulled;

  pulled = JSON.parse(localStorage.getItem('movesCount'));
  if (pulled || pulled === 0) movesCount = pulled;

  pulled = JSON.parse(localStorage.getItem('arr'));
  if (pulled) arr = pulled;

  render();
}

pullFromStorage();

function disableButton(button) {
  button.disabled = true;
  button.style.cursor = 'not-allowed';
}

function enableButton(button) {
  button.disabled = false;
  button.style.cursor = 'pointer';
}

function removeCellClass() {
  arr[moves[movesCount]] = 0;
  document.querySelector(`#c-${moves[movesCount]}`).classList.remove(movesCount % 2 ? 'r' : 'ch');
}

function addCellClass(cellId) {
  arr[moves[movesCount]] = movesCount % 2 ? 'r' : 'ch';
  document.querySelector(`#c-${cellId}`).classList.add(movesCount % 2 ? 'r' : 'ch');
}

function gameOver(indexes, lineDirection) {
  wonTitle.classList.remove('hidden');
  restartButt.style.cursor = 'pointer';

  if (indexes) {
    wonMsg.innerText = arr[indexes[0]] === 'ch' ? 'Crosses won!' : 'Toes won!';
    indexes.forEach((e) => {
      const cell = document.querySelector(`#c-${e}`);
      cell.classList.add('win');
      cell.classList.add(lineDirection);
    });
  } else {
    wonMsg.innerText = "It's a draw!";
  }

  winArray = indexes;
  winArray[3] = lineDirection;
}

function checkWin() {
  if (arr[0] === arr[1] && arr[1] === arr[2] && arr[2]) gameOver([0, 1, 2], 'horizontal');
  else if (arr[3] === arr[4] && arr[4] === arr[5] && arr[5]) gameOver([3, 4, 5], 'horizontal');
  else if (arr[6] === arr[7] && arr[7] === arr[8] && arr[8]) gameOver([6, 7, 8], 'horizontal');
  else if (arr[0] === arr[3] && arr[3] === arr[6] && arr[6]) gameOver([0, 3, 6], 'vertical');
  else if (arr[1] === arr[4] && arr[4] === arr[7] && arr[7]) gameOver([1, 4, 7], 'vertical');
  else if (arr[2] === arr[5] && arr[5] === arr[8] && arr[8]) gameOver([2, 5, 8], 'vertical');
  else if (arr[0] === arr[4] && arr[4] === arr[8] && arr[8]) gameOver([0, 4, 8], 'diagonal-right');
  else if (arr[2] === arr[4] && arr[4] === arr[6] && arr[6]) gameOver([2, 4, 6], 'diagonal-left');
  else if (movesCount === 9) gameOver();
}

function removeWinTitle() {
  wonTitle.classList.add('hidden');
  wonMsg.innerText = '';
}

function removeWinCells() {
  if (!winArray.length) return;

  let cell = document.querySelector(`#c-${winArray[0]}`);
  cell.classList.remove('win');
  cell.classList.remove(winArray[3]);

  cell = document.querySelector(`#c-${winArray[1]}`);
  cell.classList.remove('win');
  cell.classList.remove(winArray[3]);

  cell = document.querySelector(`#c-${winArray[2]}`);
  cell.classList.remove('win');
  cell.classList.remove(winArray[3]);

  winArray = [];
}

function pushToStorage() {
  localStorage.setItem('moves', JSON.stringify(moves));
  localStorage.setItem('arr', JSON.stringify(arr));
  localStorage.setItem('movesCount', JSON.stringify(movesCount));
}

function doRestart() {
  removeWinTitle();
  removeWinCells();
  disableButton(undoButt);

  while (movesCount) {
    movesCount--;
    removeCellClass();
  }
  moves.length = 0;
}

field.addEventListener('click', (e) => {
  if (!e.target.classList.contains('cell') || !wonTitle.classList.contains('hidden'))
    // if click is not on cell -> nothing to be done
    return;

  moves.length = movesCount; // deleting all the moves that can be redone
  moves[moves.length] = e.target.dataset.id; // adding new cellId to the end of moves[]
  addCellClass(e.target.dataset.id); // adding 'o' or 'x' to cell

  movesCount++;
  if (movesCount >= 4)
    // when 5 or more moves on the desk done
    checkWin();

  enableButton(undoButt);
  disableButton(redoButt);

  pushToStorage();
});

undoButt.addEventListener('click', () => {
  movesCount--;

  if (winArray.length) {
    removeWinTitle();
    removeWinCells();
  }
  removeCellClass();
  enableButton(redoButt);

  if (movesCount === 0) disableButton(undoButt);

  pushToStorage();
});

redoButt.addEventListener('click', () => {
  addCellClass(moves[movesCount]);
  enableButton(undoButt);

  movesCount++;
  if (movesCount >= 4)
    // when 5 or more moves on the desk done
    checkWin();

  if (movesCount === moves.length) disableButton(redoButt);

  pushToStorage();
});

restartButt.addEventListener('click', () => {
  doRestart();
  localStorage.clear();
});

window.addEventListener('storage', (e) => {
  if (e.key === null) doRestart();

  if (e.key !== 'movesCount') return;

  pullFromStorage();
});
