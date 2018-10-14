const express = require('express');
const app = express();
const bodyParser = require ('body-parser')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.set('port', process.env.PORT || 8080);
app.locals.title = 'calorie_jack';

app.get('/', (request, response) => {
  response.send('Hello, Dolly');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
