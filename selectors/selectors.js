
let select = document.querySelector('select');
select.style.width = '400px';
select.style.height = '600px';

function appendOption(obj, prefix) {
  const option = document.createElement('option');

  option.value = obj.id;
  option.innerHTML = prefix + obj.name;

  select.appendChild(option);
}

function recursivePaste(arr, index, prefixAmount) {
  let prefix;

  if (!arr.some( (e) => { return arr[index].left > e.left && arr[index].right < e.right; })) {
    prefixAmount = 0;
  }

  prefix = prefixAmount >= 0 ? '&nbsp;'.repeat(prefixAmount * 4) : '';

  appendOption(arr[index], prefix);


  if (arr[index].left + 1 !== arr[index].right) {
    prefixAmount += 1;
  }


  while (arr[index].left + 1 === arr[index].right && arr.some( (e, i) => {
    if (e.right === arr[index].right + 1 && e.left < arr[index].left) {
      arr.splice(i, 1);
      index--;
      return true;
    } return false;
  })) {
    prefixAmount -= 1;
  }

  if (++index < arr.length)
    recursivePaste(arr, index, prefixAmount);
}

function doWind(array) {

  array.sort((a, b) => {
    return a.left - b.left;
  });

  recursivePaste(array, 0, 0);
}

fetch('https://sectors-enpoint.herokuapp.com/sectors')
  .then(function (response) {
    return response.json();
    })
  .then(obj => {
     doWind(obj);
  });
