function createSmartObject(object) {
  const resObj = {};

  Object.defineProperty(resObj, 'name', {
    configurable: true,
    set(value) {
      this.name.value = value;
    },
  });
  resObj.name = object.name;

  console.log(resObj);

  Object.defineProperty(resObj, 'surname', {
    configurable: true,
    set(value) {
      this._surname_ = value;
    }
  });
  resObj.surname = object.surname;

  console.log(resObj);

  Object.defineProperty(resObj, 'patronimic', {
    configurable: true,
    set(value) {
      this._patronimic_ = value;
    }
  });
  resObj.patronimic = object.patronimic;

  console.log(resObj);
  return resObj;
}

function defineComputedField(object, computedFieldName, fieldsNames, f) {
  Object.defineProperty(object, computedFieldName, {
    get() {
      // console.log('getter');
      // console.log(this);
      return this[computedFieldName];
    }
  });

  Object.defineProperty(object, fieldsNames[1], {
    set(value) {
      this._patronimic_ = value;
      this[computedFieldName] = f(object.name, object.surname, object.patronimic);
    }
  });
}



const obj = createSmartObject({
  name: 'Vasya',
  surname: 'Ivanov',
  patronimic: 'Olegovich',
});

defineComputedField(obj, 'fullName', ['name', 'surname', 'patronimic'], (name, surname, patronimic) => {
  return name + ' ' + surname + ' ' + patronimic;
});

// console.log('END...');
console.log(obj.fullName); // Vasya Ivanov Olegovich
obj.surname = 'Petrov';
console.log(obj.fullName); // Vasya Petrov Olegovich
obj.fullName = 'foo'; // error
console.log(obj.fullName); // Vasya Petrov Olegovich

