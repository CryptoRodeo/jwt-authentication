require('dotenv').config(); //sets up dotenv file as soon as app starts


var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

const routes = require('./routes/index.js');


// invoke an instance of express application.
var app = express();
const router = express.Router();


const environment = process.env.NODE_ENV;

const stage = require('./config')[environment];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if(environment !== 'production')
{
    app.use(logger('dev'));
}


app.use('/api/v1', routes(router));

app.listen(`${stage.port}`, () => {
    console.log(`Server running on port: ${stage.port}`);
});

module.exports = app;