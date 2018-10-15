
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('meals').insert({
      id: 1, name: 'Breakfast'}, 'id'),
    knex('meals').insert({
      id: 2, name: 'Lunch'}, 'id'),
    knex('meals').insert({
      id: 3, name: 'Dinner'}, 'id')
    .then(() => console.log('Seeding Meals complete'))
    .catch(error => console.log(`Error seeding meals data: ${error}`))
  ])
};
