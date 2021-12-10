const express = require("express");
const hbs = require("hbs");
const path = require("path");
require("dotenv").config();

const geoService = require("./utils/GeoService");
const getWeatherData = require("./utils/WeatherService");

const app = express();
const PORT = process.env.PORT || 3839;

const publicDirPath = path.join(__dirname, "../public");
app.use(express.static(publicDirPath));

// by default hbs view engine looks .hbs files inside views folder of root direcotry
app.set("view engine", "hbs");

// we can customize where hbs should look for .hbs files, let's change to template/views folder
// setting handlebar views location
const viewsPath = path.join(__dirname, "../templates/views");
app.set("views", viewsPath);

// set path for partial views
const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Dattaveer Boda",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Dattaveer Boda",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Dattaveer Boda",
    helpMenu: ["email", "message", "chat", "call"],
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an address" });
  }
  geoService.getGeoCode(req.query.address, (error, geoData) => {
    if (error) {
      res.send({ error });
    } else {
      getWeatherData(geoData, (error, weatherData) => {
        if (error) {
          res.send({ error });
        } else {
          res.send({
            address: req.query.address,
            description: weatherData.weather_descriptions.join(","),
            temperature: weatherData.temperature,
            feelslike: weatherData.feelslike,
          });
        }
      });
    }
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help article not found!",
    name: "Dattaveer Boda",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404! Page Not Found!",
    name: "Dattaveer Boda",
  });
});

app.listen(PORT, () => {
  console.log("Server listening at 3839");
});
