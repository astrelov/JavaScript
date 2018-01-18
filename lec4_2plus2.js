function newErrDiv() {
  const res = document.createElement('div');
  res.innerText = 'Это не число';
  res.setAttribute('class', 'error-message');
  return res;
}

function newResDiv(numString) {
  const res = document.createElement('div');
  res.setAttribute('id', 'result');
  res.innerText = numString;
  return res;
}

function removeAllDivs() {
  const del = document.getElementsByTagName('div');
  while (del[0]) {
    del[0].parentNode.removeChild(del[0]);
  }
}

function checkNaN(string) {
  return Number.isNaN(Number(string));
}

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');

  const inp1 = document.createElement('input');
  inp1.setAttribute('id', 'inp1');
  inp1.setAttribute('autofocus', true);

  const inp2 = document.createElement('input');
  inp2.setAttribute('id', 'inp2');

  const butt = document.createElement('button');
  butt.innerText = 'Посчитать';

  body.appendChild(inp1);
  body.appendChild(inp2);
  body.appendChild(butt);

  /* by click on button removes all divs from <body>. if input Values are numbers,
create result div. Else create error divs */
  butt.addEventListener('click', () => {
    removeAllDivs();

    if (!checkNaN(inp1.value) && !checkNaN(inp2.value)) {
      body.appendChild(newResDiv(Number(inp1.value) + Number(inp2.value)));
    } else {
      if (checkNaN(inp1.value)) body.insertBefore(newErrDiv(), inp2);
      if (checkNaN(inp2.value)) body.insertBefore(newErrDiv(), butt);
    }
  });
});
