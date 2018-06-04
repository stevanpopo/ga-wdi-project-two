// Required packages
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const router = require('./config/router');

//Called packages
const app = express();

// Used packages & Other bits
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);

app.use(express.static(`${__dirname}/public`));

//Last line always
app.use(router);
app.listen(PORT, () => console.log(`App is runnig on ${PORT}`));
