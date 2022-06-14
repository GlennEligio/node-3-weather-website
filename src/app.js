const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();
const port = process.env.PORT || 3000;

// Setup paths for Express config
const publicDirectory = path.join(__dirname, "../public");
const viewDirectory = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("views", viewDirectory);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Glenn",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "John Glenn Eligio",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "Help me. HELP MEEE",
    name: "Glenn",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  const address = req.query.address;

  geocode(address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(longitude, latitude, (error, forecast) => {
      if (error) {
        return res.send({
          error,
        });
      }

      res.send({
        forecast,
        location,
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error",
    name: "John Glenn Eligio",
    error: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error",
    name: "John Glenn Eligio",
    error: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port 3000");
});
