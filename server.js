const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/heroku_n59pdsdb", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

// routes
app.use(require("./Develop/routes/api.js"));

const MONGODB_URI =
  process.env.MONGODB_URL || "mongodb://localhost/heroku_n59pdsdb";
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4 // Use IPv4, skip trying IPv6
};
mongoose.connect(MONGODB_URI, options)



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});