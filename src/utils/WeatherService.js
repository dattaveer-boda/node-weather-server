const request = require("postman-request");

const getWeatherData = ({ latitude, longitude, location }, callback) => {
  console.log(location);
  const weatherUrl = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_ACCESS_KEY}&query=${latitude},${longitude}`;
  request({ url: weatherUrl, json: true }, (error, response) => {
    if (error) {
      callback(error, null);
    } else {
      const weatherData = response.body.current;
      callback(null, weatherData);
    }
  });
};

module.exports = getWeatherData;
