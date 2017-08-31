const express = require('express');
const path = require('path');
const axios = require("axios");
const CircularJSON = require('circular-json');
const favicon = require('serve-favicon');

const router = require("./router.js");

const app = express();

app.use(favicon(path.join(__dirname + '/favicon.ico')));

app.use(express.static('dist'));

router(app);

const PORT = process.env.PORT || 3050;
app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`));
