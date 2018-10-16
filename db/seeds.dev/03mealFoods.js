
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('meal_foods').insert({
      food_id: 1, meal_id: 1}, 'id'),
    knex('meal_foods').insert({
      food_id: 2, meal_id: 2}, 'id'),
    knex('meal_foods').insert({
      food_id: 3, meal_id: 3}, 'id')
    .then(() => console.log('Seeding meal_foods complete'))
    .catch(error => console.log(`Error seeding foods data: ${error}`))
  ])
};
