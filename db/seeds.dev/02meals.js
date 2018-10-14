
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('meals').insert({
      name: 'Breakfast'}, 'id'),
    knex('meals').insert({
      name: 'Lunch'}, 'id'),
    knex('meals').insert({
      name: 'Dinner'}, 'id')
    .then(() => console.log('Seeding Meals complete'))
    .catch(error => console.log(`Error seeding foods data: ${error}`))
  ])
};
