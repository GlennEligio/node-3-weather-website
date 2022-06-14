const request = require("postman-request");

const geocode = (address, callback) => {
  const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZ2xlbm5lbGlnaW8iLCJhIjoiY2w0OXg2emx3MTZhczNxbXIyOHA3Nzg3ZiJ9.TGTZsl9vBMOYeSlggHSJKQ&limit=1`;

  request({ url: mapboxUrl, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the mapbox server", undefined);
    } else if (body.features.length === 0) {
      callback(
        "No matching location found. Try another search query",
        undefined
      );
    } else {
      const longitude = body.features[0].center[1];
      const latitude = body.features[0].center[0];
      const location = body.features[0].place_name;
      callback(undefined, {
        longitude,
        latitude,
        location,
      });
    }
  });
};

module.exports = geocode;
