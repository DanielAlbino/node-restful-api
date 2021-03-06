var express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require("mongoose"),
  Task = require("./api/models/userModel"), //created model loading here
  bodyParser = require("body-parser");

require("dotenv").config();

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONNECTION);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require("./api/routes/usersRoutes"); //importing route
routes(app); //register the route

app.listen(port);

console.log("Users RESTful API server started on: " + port);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});
