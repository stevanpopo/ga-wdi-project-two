// Required packages
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const router = require('./config/router');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Called packages
const app = express();

// Used packages & Other bits
const { port, dbURI } = require('./config/environment');
// const PORT = process.env.PORT || 3000; no longer needed because of above line

mongoose.connect(dbURI);
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));

//Last line always
app.use(router);
app.listen(port, () => console.log(`App is running on ${port}`));
