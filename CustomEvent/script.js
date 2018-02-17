const bc = new BroadcastChannel('test_channel');

const container = document.querySelector('#container');
const ul = document.createElement('ul');

const childrenItemInput = document.createElement('input');
childrenItemInput.type = 'text';
childrenItemInput.id = 'childrenItemInput';
childrenItemInput.autofocus = true;
const button = document.createElement('button');
button.innerText = 'Add';

container.appendChild(ul);
container.appendChild(childrenItemInput);
container.appendChild(button);

button.addEventListener('click', () => {
  let itemText = childrenItemInput.value;
  bc.postMessage({type: 'addChildrenItem', itemText});
});

childrenItemInput.addEventListener('keypress', (e) => {
  if (e.key !== 'Enter') return;
  let itemText = childrenItemInput.value;
  bc.postMessage({type: 'addChildrenItem', itemText});
});

let bc2 = new BroadcastChannel('test_channel');

bc2.onmessage = function (ev) {
  console.log(ev);
  if (ev.data.type === 'addChildrenItem') {
    addChildrenItem(ev);
  }
};

const addChildrenItem = (e) => {
  const listItem = document.createElement('li');
  listItem.innerText = e.data.itemText;
  ul.appendChild(listItem);
};
