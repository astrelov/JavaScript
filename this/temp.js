const user = {
  name: 'user',
};

const user2 = {
  name: 'user2',
};

const user3 = 'user3';

function greet() {
  console.log(this.name);
}

user.greet = greet;
user2.greet = greet;
user3.greet = greet;

user.greet();
user2.greet();
console.log(user3.greet);
