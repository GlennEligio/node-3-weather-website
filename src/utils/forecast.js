const request = require("postman-request");

const forecast = (longitude, latitude, callback) => {
  const weatherUrl = `http://api.weatherstack.com/current?access_key=a2cbef76a319f910168600901def37ce&query=${encodeURIComponent(
    longitude
  )},${encodeURIComponent(latitude)}&units=f`;

  request({ url: weatherUrl, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const weatherDesc = body.current.weather_descriptions[0];
      const temparature = body.current.temperature;
      const apparentTemp = body.current.feelslike;
      const windSpeed = body.current.wind_speed;
      callback(
        undefined,
        `${weatherDesc}. With windspeed of ${windSpeed} It is currently ${temparature} degrees out. It feels like ${apparentTemp} degrees out.`
      );
    }
  });
};

module.exports = forecast;
