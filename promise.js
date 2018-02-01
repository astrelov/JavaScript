function httpGet(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status !== 200) {
          reject(new Error('Failed to get data'));
          return;
        }
        const data = JSON.parse(request.responseText);
        resolve(data);
      }
    });
    request.open('GET', url);
    request.send();
  });
}

function getUsers() {
  return httpGet(`http://jsonplaceholder.typicode.com/users`);
}

function getPosts(userId) {
  return httpGet(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
}

getUsers()
  .then((users) => {
    let promises = users.map((user) => {
      return getPosts(user.id)
        .then((posts) => {
          user.posts = posts;
          return user;
        });
    });
    return Promise.all(promises);
  })
  .then((users) => {
    //render
    const container = document.querySelector('#container');
    const usersUl = document.createElement('ul');
    container.appendChild(usersUl);
    users.forEach((user) => {
      const userLi = document.createElement('li');
      userLi.innerText = user.name;
      usersUl.appendChild(userLi);
      const postsUl = document.createElement('ul');
      userLi.appendChild(postsUl);
      user.posts.forEach(post => {
        const postLi = document.createElement('li');
        postLi.innerText = post.title;
        postsUl.appendChild(postLi);
      });
    });
  })
  .catch(err => console.error('failed to load', err));
