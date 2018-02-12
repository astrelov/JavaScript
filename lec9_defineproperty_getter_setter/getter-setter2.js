function createSmartObject(object) {
  return object;
}

function defineComputedField(object, computedFieldName, f) {
  Object.defineProperty(object, computedFieldName, {
    get() {
      return f(object);
    },
  });
}



const obj = createSmartObject({
  name: 'Vasya',
  surname: 'Ivanov',
  patronimic: 'Olegovich',
});

defineComputedField(obj, 'fullName', function (data) {
  return data.name + ' ' + data.surname + ' ' + data.patronimic;
});

// console.log('END...');
console.log(obj.fullName); // Vasya Ivanov Olegovich
obj.surname = 'Petrov';
console.log(obj.fullName); // Vasya Petrov Olegovich
obj.fullName = 'foo'; // error
console.log(obj.fullName); // Vasya Petrov Olegovich

