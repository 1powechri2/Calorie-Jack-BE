const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const pry = require('pryjs')

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

app.get('/api/v1/foods', (request, response) => {
  database('foods').select().orderBy('id')
  .then((foods) => {
    response.status(200).json(foods);
  })
  .catch((error) => {
    resonse.status(500).json({ error });
  })
});

app.get('/api/v1/foods/:id', (request, response) => {
  const id = request.params.id
  database("foods").where("id", id).select("*", ['id', 'name', 'calories'])
  .then(food => {
    response.status(201).json({ id: food[0]['id'], name: food[0]['name'], calories: food[0]['calories'] })
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})

app.post('/api/v1/foods', (request, response) => {
  const food = request.body;
  for (let requiredParameter of ['name', 'calories']) {
    if (!food[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { name: <string>, calories: <integer> }. You are missing a "${requiredParameter} property."`
      })
    }
  }
  database('foods').insert(food, ['id', 'name', 'calories'])
  .then(food => {
    response.status(201).json({ id: food[0]['id'], name: food[0]['name'], calories: food[0]['calories'] })
  })
  .catch(error => {
    response.status(500).json({ error })
  })
});

app.patch('/api/v1/foods/:id', (request, response) => {
  const id = request.params.id
  const foodData = request.body

  database("foods").where("id", id).update(foodData)
  .then(food => {
    response.status(200).json({ message: `Food with id: ${id} was successfully updated` })
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})

app.delete('/api/v1/foods/:id', (request, response) => {
  const id = request.params.id

  database("foods").where("id", id).delete()
  .then(food => {
    response.status(200).json({ message: `Food with id: ${id} was successfully deleted`})
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
