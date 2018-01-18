const temp = () => {
  console.log('loaded');
  const container = document.querySelector('#container');

  console.log(container);
  container.addEventListener('click', (e) => {
    e.target.style.backgroundColor = e.target.style.backgroundColor === 'blue' ? 'red' : 'blue';
    e.stopPropagation();
  });
};

document.addEventListener('DOMContentLoaded', temp);
