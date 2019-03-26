const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    address = encodeURIComponent(address);

    request({
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWVocnVuZXNkYWdvbiIsImEiOiJjanF5cTN3NHIwNmFmM3lzZXlzYnIzZHZsIn0.Lt1a3yczIHtKxfUPXaaceg`,
      json: true
    }, (error, response, body) => {
      if(error){
        reject("Unable to connect to Mapbox servers.");
      } else if (body.features.length === 0) {
        reject("Couldn't find that address.");
      }else{
        resolve({
          address: body.features[0].place_name,
          longitude: body.features[0].geometry.coordinates[0],
          latitude: body.features[0].geometry.coordinates[1]
        });
      }
    });
  });
};

geocodeAddress('18023').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
