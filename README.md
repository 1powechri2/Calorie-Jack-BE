# CalorieJack - BackEnd, a Quantified Self Calorie Tracker
### Built by Angela Duran and Chris Powell

This project is the Back-End for CalorieJack, a calorie tracking app. The Front-End is hosted at https://duranangela.github.io/quantified-self-fe.

This project is an Express API which uses a Postgres database and is hosted at https://still-dusk-48291.herokuapp.com/

The endpoints are as follows:

`GET /api/v1/foods` - returns all foods in the database    
`GET /api/v1/foods/:id` - returns food with specified id    
`POST /api/v1/foods` - creates a new food in the database with parameters `{ "food": { "name": "Name of food here", "calories": "Calories here"} }`    
`PATCH /api/v1/foods/:id` - updates an existing food with aforementioned parameters    
`DELETE /api/v1/foods/:id` - deletes the food with specified id    
`GET /api/v1/meals` - returns all meals in the database with associated foods    
`GET /api/v1/meals/:meal_id/foods` - returns all foods associated with the meal with associated id    
`POST /api/v1/meals/:meal_id/foods/:id` - add the food with :id to the meal with :meal_id    
`DELETE /api/v1/meals/:meal_id/foods/:id` - removes the food with :id from the meal with :meal_id    
`GET /api/v1/favorite_foods` - retrieves data on the foods which were eaten most frequently    

If you would like to clone down this repository yourself please feel free to do so, with the knowledge that you will have to create your own Postgres database. If you would still like to proceed please continue by following these steps:
```
npm install
knex migrate:latest
knex seed:run
npm start
```
You will then be able to visit the endpoints using localhost:8080.

If you would like to run the test suite, please run `mocha --exit`. Note that currently this may wipe any changes you have made to your database, but will hopefully be fixed soon.
