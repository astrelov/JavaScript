document.addEventListener('DOMContentLoaded', () => {
  let listState = [];
  const but = document.querySelector('button');
  const input = document.querySelector('input');
  const ul = document.querySelector('ul');

  const value = localStorage.getItem('listState');
  if (value) {
    listState = JSON.parse(value);
  }

  const store = (item) => {
    listState.push(item);
    localStorage.setItem('listState', JSON.stringify(listState));
  };

  const render = () => {
    ul.innerHTML = '';
    listState.forEach((text) => {
      const li = document.createElement('li');
      li.textContent = text;
      ul.appendChild(li);
    });
  };

  but.addEventListener('click', () => {
    const text = input.value;
    input.value = '';
    store(text);
    render();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' || input.value === '') {
      return;
    }
    const text = input.value;
    input.value = '';
    store(text);
    render();
  });

  render();
});
