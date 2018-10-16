const express = require('express');
const app = express();
const bodyParser = require ('body-parser')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const pry = require('pryjs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.set('port', process.env.PORT || 8080);
app.locals.title = 'calorie_jack';

app.get('/', (request, response) => {
  response.send('Hello, Dolly');
});
//
// app.get('/api/v1/meals', (request, response) => {
//   database.raw(`
//       SELECT meals.id, meals.name, array_to_json
//       (array_agg(json_build_object('id', foods.id, 'name', foods.name, 'calories', foods.calories)))
//       AS foods
//       FROM meals
//       JOIN meal_foods ON meals.id = meal_foods.meal_id
//       JOIN foods ON meal_foods.food_id = foods.id
//       GROUP BY meals.id`)
//   .then(meals => {
//     response.status(200).json(meals)
//   })
// })

app.get('/api/v1/meals', (request, response) => {
  database.select('meals.id', 'meals.name', 'foods.id', 'foods.name', 'foods.calories')
  .from('meals')
  .join('meal_foods', ())
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
