const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

const jwt = require('jsonwebtoken');
const jwtSecret = "mysuperdupersecret";

// Middleware

// JSON parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware
app.use(function (req, res, next) {
  // Allow Origins
  res.header("Access-Control-Allow-Origin", "*");
  // Allow Methods
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  // Allow Headers
  res.header("Access-Control-Allow-Headers", "Origin, Accept, Content-Type, Authorization");
  // Handle preflight, it must return 200
  if (req.method === "OPTIONS") {
    // Stop the middleware chain
    return res.status(200).end();
  }
  // Next middleware 
  next();
});

// Auth middleware
app.use((req, res, next) => {
  // login does not require jwt verification
  if (req.path == '/api/login') {
    // next middleware
    return next()
  }

  // get token from request header Authorization
  const token = req.headers.authorization

  // Debug print
  console.log("")
  console.log(req.path)
  console.log("authorization:", token)

  // Token verification
  try {
    var decoded = jwt.verify(token, jwtSecret);
    console.log("decoded", decoded)
  } catch (err) {
    // Catch the JWT Expired or Invalid errors
    return res.status(401).json({ "msg": err.message })
  }

  // next middleware
  next()
});

// Routes
app.get("/api/login", (req, res) => {
  // generate a constant token, no need to be fancy here
  const token = jwt.sign({ "username": "prima" }, jwtSecret, { expiresIn: 60 }) // 1 min token
  // return it back
  res.json({ "token": token })
});

app.get("/api/token/ping", (req, res) => {
  // Middleware will already catch if token is invalid
  // so if he can get this far, that means token is valid
  res.json({ "msg": "all good mate" })
})

app.get("/api/ping", (req, res) => {
  // random endpoint so that the client can call something
  res.json({ "msg": "pong" })
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});