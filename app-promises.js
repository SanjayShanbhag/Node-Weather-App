const yargs = require('yargs');
const axios = require('axios');

const defaultMaker = require('./defaultMaker/defaultMaker.js');

const argv = yargs
  .options({
    a: {
      demand: false,
      describe: 'Address to fetch the weather for',
      alias: 'address',
      string: true
    },
    d: {
      demand: false,
      describe: 'Set or change the default location.',
      alias: 'default',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

if(argv.default) {
  defaultMaker.add(argv.default);
  console.log('The Default address has been added/changed');
}
if(argv.address) {
  var address = argv.address;
} else {
  var address = defaultMaker.get();
  if(address){
    address = address.defaultAddress;
  } else {
    console.log('The Default Address is not specified. Please enter the address.');
  }
}


var address = encodeURIComponent(address);
var geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWVocnVuZXNkYWdvbiIsImEiOiJjanF5cTN3NHIwNmFmM3lzZXlzYnIzZHZsIn0.Lt1a3yczIHtKxfUPXaaceg`;
axios.get(geocodeUrl).then((response) => {
  if (response.data.features.length === 0) {
    throw new Error('Could Not Find That Address');
  }
  console.log(response.data.features[0].place_name);
  var lat = response.data.features[0].geometry.coordinates[1];
  var lng = response.data.features[0].geometry.coordinates[0];
  var weatherUrl = `https://api.darksky.net/forecast/bbaba88a98fe64b44a496758e5194813/${lat},${lng}`;
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemp = response.data.currently.apparentTemperature;
  console.log(`It is ${temperature}, but it feels like ${apparentTemp}.`);
}).catch((e) => {
  if (e.code === 'ECONNREFUSED') {
    console.log('There was some problem connecting with the servers.');
  } else {
    console.log(e.message);
  }
});

//bbaba88a98fe64b44a496758e5194813
