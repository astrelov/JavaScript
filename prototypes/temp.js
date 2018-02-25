function User(name) {
  this.name = name;
}

function Admin(isPunishable) {
  this.isPunishable = isPunishable;
}

Admin.prototype.punish = (name) => {
  console.log(this);
  if (this.isPunishable) { console.log(`${name} has been punished`); }
};

Object.setPrototypeOf(Admin.prototype, User.prototype);

const human = {
  isHuman: true,
};

User.prototype = human;

console.log(new User('Bob'));
const admin = new Admin(true);
console.log(admin);
admin.punish('Greg');
