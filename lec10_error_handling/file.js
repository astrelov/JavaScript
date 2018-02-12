const data = '{"name": "vasya"}';

try {
  console.log('try block');
  const user = JSON.parse(data);

  if (!user.name) {
    throw new SyntaxError('Invalid data');
  }

  console.log(user.name);


} catch (err) {
  // console.log(err.name);
  // console.log(err.message);
  // console.log(err.stack);
  if (err.name !== 'SyntaxError') {
    throw err;
  }
  console.log('got invalid data: ', err.message);
}

console.log('after all block');
