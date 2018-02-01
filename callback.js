function getUser(callbackFunction) {
  const usersRequest = new XMLHttpRequest();
  usersRequest.addEventListener('readystatechange', () => {
    if (usersRequest.readyState == XMLHttpRequest.DONE) {
      if(usersRequest.status != 200){
        callbackFunction(null);
        return;
      }
      const ul = document.createElement('ul');
      const container = document.querySelector('#container');
      const users = JSON.parse(usersRequest.responseText);
      users.forEach((user) => {
        const li = document.createElement('li');
        li.innerText = user.name;
        ul.appendChild(li);

        const postsRequest = new XMLHttpRequest();
        postsRequest.addEventListener('readystatechange', () => {
          if (postsRequest.readyState == XMLHttpRequest.DONE) {
            if(postsRequest.status != 200){
              callbackFunction(null);
              return;
            }
            const posts = JSON.parse(postsRequest.responseText);
            const ulForPosts = document.createElement('ul');
            posts.forEach((post) => {
              const liForPosts = document.createElement('li');
              liForPosts.innerText = post.title;
              ulForPosts.appendChild(liForPosts);
            });
            li.appendChild(ulForPosts);
            callbackFunction(posts);
          }
        });
        postsRequest.open('GET', `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
        postsRequest.send();
      });
      // https://jsonplaceholder.typicode.com/posts?userId=1

      container.appendChild(ul);
    }

  });
  usersRequest.open('GET', `http://jsonplaceholder.typicode.com/users`);
  usersRequest.send();

}

getUser((users) => {console.log(users);})
