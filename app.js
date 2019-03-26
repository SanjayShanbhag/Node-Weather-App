const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

const argv = yargs
  .options({
    a: {
      demand: true,
      describe: 'Address to fetch the weather for',
      alias: 'address',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var address = argv.address;
geocode.geocodeAddress(address, (errorMessage, results) => {
  if(errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if(errorMessage) {
        console.log(errorMessage);
      } else{
        console.log(`The Temperature is ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemp}`);
      }
    });
  }
});
