const select = document.querySelector('select');
let dataArray;

function setLeftPadding(charAmount) {
  this.style.paddingLeft = `${charAmount}ch`;
}

function fetchElement(siblings, left, right, depth = 0) {
  dataArray.forEach((item) => {
    if (item.left === left) {
      siblings.push(item);

      const currItem = siblings[siblings.length - 1];
      currItem.depth = depth;

      if (item.left + 1 < item.right) {
        currItem.childs = fetchElement([], item.left + 1, item.right - 1, depth + 1);
      }

      if (right && item.right < right) {
        siblings = fetchElement(siblings, item.right + 1, right, depth);
      }
    }
  });
  return siblings;
}

function makeDocumentFragment(nestedSetData) {
  const fragment = document.createDocumentFragment();

  function paste(array) {
    array.forEach((x) => {
      const op = new Option(x.name, x.id);
      setLeftPadding.call(op, x.depth * 2);
      fragment.appendChild(op);
      if (x.childs) {
        paste(x.childs);
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

    const nestedSetData = fetchElement([], 1, dataArray.length * 2);
    const fragment = makeDocumentFragment(nestedSetData);
    select.appendChild(fragment);
  });
