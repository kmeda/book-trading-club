const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const axios = require("axios");
const CircularJSON = require('circular-json');
const favicon = require('serve-favicon');
const router = require("./router.js");

const app = express();

mongoose.connect('mongodb://admin:admin@ds153003.mlab.com:53003/fcc-book-club', {useMongoClient: true});

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));
app.use(favicon(path.join(__dirname + '/favicon.ico')));
app.use(express.static('dist'));

router(app);

const PORT = process.env.PORT || 3050;
app.listen(PORT, () => console.log(`Server listening on localhost:${PORT}`));
