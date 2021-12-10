const request = require("postman-request");

const getGeoCode = (address, callback) => {
  // prettier-ignore
  const geourl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.GEO_ACCESS_KEY}&limit=1`;
  // call to mapbox api for geo information based on name
  request({ url: geourl, json: true }, (error, response) => {
    let body;
    if (response) {
      body = response.body;
    }
    if (error) {
      callback(error, null);
    } else if (body.message) {
      callback(body.message, null);
    } else if (body.features.length === 0) {
      callback("Unable to find location!");
    } else {
      const geodata = body.features[0];
      const [longitude, latitude] = geodata.center;
      callback(null, {
        latitude,
        longitude,
        location: geodata.place_name,
      });
    }
  });
};

module.exports = {
  getGeoCode,
};
