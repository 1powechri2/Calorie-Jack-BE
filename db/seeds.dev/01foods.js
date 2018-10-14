
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('mealFoods').del()
    .then(() => knex('meals').del())
    .then(() => knex('foods').del())

    .then(() => {
      return Promise.all([
        knex('foods').insert({
          name: 'Banana', calories: 150 }, 'id'),
        knex('foods').insert({
          name: 'apple', calories: 220 }, 'id'),
        knex('foods').insert({
          name: 'Granola Bar', calories: 300 }, 'id')
        .then(() => console.log('Seeding Foods complete'))
        .catch(error => console.log(`Error seeding foods data: ${error}`))
    ])
  });
};
