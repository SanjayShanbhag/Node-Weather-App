const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/bbaba88a98fe64b44a496758e5194813/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if(!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemp: body.currently.apparentTemperature
      });
    }else{
      callback("There was some error connecting to forecast.io servers.");
    }
  });
};

module.exports = {
  getWeather
}
