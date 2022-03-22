const express = require('express');
const userRoute = require('./routes/user')

const app = express();
const db = require('./config/dbConfig');
const userRoutes = require('./routes/user');

app.get("/api", function (req, res) {
  res.send('hello mabite')
});

// app.post()













module.exports = app;