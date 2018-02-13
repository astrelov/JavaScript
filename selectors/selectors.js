
let select = document.querySelector('select');

function appendOption(obj, prefix) {
  const option = document.createElement('option');

  option.value = obj.id;
  option.innerHTML = prefix + obj.name;

  select.appendChild(option);
}

function recursive(arr, index, recursionDepth) {
  const obj = arr[index];
  let prefix;

  if (recursionDepth !== 0 && !arr.some( (e) => { return obj.left > e.left && obj.right < e.right; })) {
    recursionDepth = 0;
  }

  prefix = recursionDepth >= 0 ? '&nbsp;'.repeat(recursionDepth * 4) : '';

  appendOption(obj, prefix);


  if (obj.left + 1 !== obj.right) {
    recursionDepth += 1;
  }


  while (obj.left + 1 === obj.right && arr.some( (e, index) => {
    if (e.right === obj.right + 1 && e.left < obj.left) {
      arr[index] = {};
      return true;
    } return false;
  })) {
    recursionDepth -= 1;
  }

  index++;

  if (index < arr.length)
    recursive(arr, index, recursionDepth);
}

function doWind(array) {

  array.sort((a, b) => {
    return a.left - b.left;
  });

  console.log(array);

  recursive(array, 0, 0);
}

// fetch('https://sectors-enpoint.herokuapp.com/sectors')
//   .then(function (response) {
//     return response.json();
//     })
//   .then(obj => {
//     console.log('received data');
//      doWind(obj);
//   });

doWind([{"id":1,"name":"Manufacturing","left":1,"right":119},{"id":2,"name":"Service","left":128,"right":157},{"id":3,"name":"Other","left":120,"right":127},{"id":5,"name":"Printing","left":97,"right":104},{"id":6,"name":"Food and Beverage","left":6,"right":21},{"id":7,"name":"Textile and Clothing","left":105,"right":110},{"id":8,"name":"Wood","left":111,"right":118},{"id":9,"name":"Plastic and Rubber","left":81,"right":96},{"id":11,"name":"Metalworking","left":64,"right":80},{"id":12,"name":"Machinery","left":42,"right":63},{"id":13,"name":"Furniture","left":22,"right":41},{"id":18,"name":"Electronics and Optics","left":4,"right":5},{"id":19,"name":"Construction materials","left":2,"right":3},{"id":21,"name":"Transport and Logistics","left":147,"right":156},{"id":22,"name":"Tourism","left":143,"right":144},{"id":25,"name":"Business services","left":129,"right":130},{"id":28,"name":"Information Technology and Telecommunications","left":133,"right":142},{"id":29,"name":"Energy technology","left":123,"right":124},{"id":33,"name":"Environment","left":125,"right":126},{"id":35,"name":"Engineering","left":131,"right":132},{"id":37,"name":"Creative industries","left":121,"right":122},{"id":39,"name":"Milk & dairy products","left":15,"right":16},{"id":40,"name":"Meat & meat products","left":13,"right":14},{"id":42,"name":"Fish & fish products","left":11,"right":12},{"id":43,"name":"Beverages","left":9,"right":10},{"id":44,"name":"Clothing","left":106,"right":107},{"id":45,"name":"Textile","left":108,"right":109},{"id":47,"name":"Wooden houses","left":116,"right":117},{"id":51,"name":"Wooden building materials","left":114,"right":115},{"id":53,"name":"Plastics welding and processing","left":91,"right":92},{"id":54,"name":"Packaging","left":82,"right":83},{"id":55,"name":"Blowing","left":87,"right":88},{"id":57,"name":"Moulding","left":89,"right":90},{"id":62,"name":"Forgings, Fasteners","left":74,"right":75},{"id":66,"name":"MIG, TIG, Aluminum welding","left":78,"right":79},{"id":67,"name":"Construction of metal structures","left":65,"right":66},{"id":69,"name":"Gas, Plasma, Laser cutting","left":76,"right":77},{"id":75,"name":"CNC-machining","left":72,"right":73},{"id":91,"name":"Machinery equipment/tools","left":45,"right":46},{"id":93,"name":"Metal structures","left":57,"right":58},{"id":94,"name":"Machinery components","left":43,"right":44},{"id":97,"name":"Maritime","left":49,"right":56},{"id":98,"name":"Kitchen","left":29,"right":30},{"id":99,"name":"Project furniture","left":39,"right":40},{"id":101,"name":"Living room","left":31,"right":32},{"id":111,"name":"Air","left":148,"right":149},{"id":112,"name":"Road","left":152,"right":153},{"id":113,"name":"Water","left":154,"right":155},{"id":114,"name":"Rail","left":150,"right":151},{"id":121,"name":"Software, Hardware","left":138,"right":139},{"id":122,"name":"Telecommunications","left":140,"right":141},{"id":141,"name":"Translation services","left":145,"right":146},{"id":145,"name":"Labelling and packaging printing","left":102,"right":103},{"id":148,"name":"Advertising","left":98,"right":99},{"id":150,"name":"Book/Periodicals printing","left":100,"right":101},{"id":224,"name":"Manufacture of machinery","left":47,"right":48},{"id":227,"name":"Repair and maintenance service","left":61,"right":62},{"id":230,"name":"Ship repair and conversion","left":54,"right":55},{"id":263,"name":"Houses and buildings","left":67,"right":68},{"id":267,"name":"Metal products","left":69,"right":70},{"id":269,"name":"Boat/Yacht building","left":52,"right":53},{"id":271,"name":"Aluminium and steel workboats","left":50,"right":51},{"id":337,"name":"Other (Wood)","left":112,"right":113},{"id":341,"name":"Outdoor","left":37,"right":38},{"id":342,"name":"Bakery & confectionery products","left":7,"right":8},{"id":378,"name":"Sweets & snack food","left":19,"right":20},{"id":385,"name":"Bedroom","left":25,"right":26},{"id":389,"name":"Bathroom/sauna","left":23,"right":24},{"id":390,"name":"Children’s room","left":27,"right":28},{"id":392,"name":"Office","left":33,"right":34},{"id":394,"name":"Other (Furniture)","left":35,"right":36},{"id":437,"name":"Other","left":17,"right":18},{"id":508,"name":"Other","left":59,"right":60},{"id":542,"name":"Metal works","left":71,"right":78},{"id":556,"name":"Plastic goods","left":84,"right":85},{"id":559,"name":"Plastic processing technology","left":86,"right":93},{"id":560,"name":"Plastic profiles","left":94,"right":95},{"id":576,"name":"Programming, Consultancy","left":136,"right":137},{"id":581,"name":"Data processing, Web portals, E-marketing","left":134,"right":135}]);

