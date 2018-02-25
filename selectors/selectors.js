const select = document.querySelector('select');
let dataArray;

function setLeftPadding(charAmount) {
  this.style.paddingLeft = `${charAmount}ch`;
}

function hasChild(item) {
  return item.left + 1 < item.right;
}

function hasNextSibling(item, right) {
  return right && item.right < right;
}

function fetchElement(siblings, left, right, depth = 0) {
  dataArray.forEach((item) => {
    if (item.left === left) {
      const currItem = item;
      let childs;

      if (hasChild(item)) {
        childs = fetchElement(new Map(), item.left + 1, item.right - 1, depth + 1);
      }

      currItem.depth = depth;
      siblings.set(currItem, childs);

      if (hasNextSibling(item, right)) {
        siblings = fetchElement(siblings, item.right + 1, right, depth);
      }
    }
  });
  return siblings;
}

function makeDocumentFragment(nestedSetData) {
  const fragment = document.createDocumentFragment();

  function paste(nestedSetMap) {
    nestedSetMap.forEach((value, key) => {
      const op = new Option(key.name, key.id);
      setLeftPadding.call(op, key.depth * 2);
      fragment.appendChild(op);
      if (value) {
        paste(value);
      }
    });
  }

  paste(nestedSetData);
  return fragment;
}

fetch('https://sectors-enpoint.herokuapp.com/sectors')
  .then(response => response.json())
  .then((array) => {
    dataArray = array.sort((a, b) => a.left - b.left);

    const nestedSetDataMap = fetchElement(new Map(), 1, dataArray.length * 2);
    const fragment = makeDocumentFragment(nestedSetDataMap);
    select.appendChild(fragment);
  });
