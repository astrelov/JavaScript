const fragment = document.createDocumentFragment();
const select = document.querySelector('select');
let dataArray;
let parentIndex;
select.style.width = '400px';
select.style.height = '600px';

function hasNoParent(currentObj) {
  return !dataArray.some(e => (currentObj.left > e.left && currentObj.right < e.right));
}

function hasParent(currentObj) {
  return dataArray.some((elem, index) => {
    if (elem.right === currentObj.right + 1 && elem.left < currentObj.left) {
      parentIndex = index;
      return true;
    }
    return false;
  });
}

function hasChild(currentObj) {
  return currentObj.left + 1 !== currentObj.right;
}

function setLeftPadding(charAmount) {
  this.style.paddingLeft = `${charAmount}ch`;
}

function recursivePaste(index = 0, paddingCharAmount = 0) {
  const currentObj = dataArray[index];

  if (hasNoParent(currentObj)) {
    paddingCharAmount = 0;
  }

  const op = new Option(currentObj.name, currentObj.id);
  setLeftPadding.call(op, paddingCharAmount * 2);
  fragment.appendChild(op);

  if (hasChild(currentObj)) {
    paddingCharAmount += 1;
  }

  while (!hasChild(currentObj) && hasParent(currentObj)) {
    dataArray.splice(parentIndex, 1);
    index -= 1;
    paddingCharAmount -= 1;
  }

  index += 1;
  if (index < dataArray.length) {
    recursivePaste(index, paddingCharAmount);
  }
}

fetch('https://sectors-enpoint.herokuapp.com/sectors')
  .then(response => response.json())
  .then((array) => {
    dataArray = array.sort((a, b) => (a.left - b.left));

    recursivePaste();
    select.appendChild(fragment);
  });
