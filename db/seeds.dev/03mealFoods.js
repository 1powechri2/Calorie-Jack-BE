
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('mealFoods').insert({
      food_id: 1, meal_id: 1}, 'id'),
    knex('mealFoods').insert({
      food_id: 2, meal_id: 2}, 'id'),
    knex('mealFoods').insert({
      food_id: 3, meal_id: 3}, 'id')
    .then(() => console.log('Seeding mealFoods complete'))
    .catch(error => console.log(`Error seeding foods data: ${error}`))
  ])
};
