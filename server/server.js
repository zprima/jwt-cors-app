const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

const jwt = require('jsonwebtoken');
const jwtSecret = "mysuperdupersecret";

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "*");

  // Handle preflight, they must return 200
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.use((req, res, next) => {
  if (req.path == '/api/login') {
    return next()
  }

  console.log("")
  console.log(req.path)

  const token = req.headers.authorization

  console.log("authorization:", token)
  console.log("headers", req.headers)


  try {
    var decoded = jwt.verify(token, jwtSecret);
    console.log("decoded", decoded)
  } catch (err) {
    return res.status(401).json({ "msg": err.message })
  }

  next()
});

// Routes
app.get("/api/login", (req, res) => {
  const token = jwt.sign({ "username": "prima" }, jwtSecret, { expiresIn: 300 }) //5min token

  res.json({ "token": token })
});

app.get("/api/token/ping", (req, res) => {
  // Middleware will already catch if token is invalid
  // so if he can get this far, that means token is valid
  res.json({ "msg": "all good mate" })
})

app.get("/api/ping", (req, res) => {
  res.json({ "msg": "pong" })
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});