
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('meal_foods').del()
    .then(() => {
      return knex('meals').del();
    })
    .then(() => {
      return knex('foods').del();
    })

    .then(() => {
      return Promise.all([
        knex('foods').insert({
          id: 1, name: 'Banana', calories: 150 }, 'id'),
        knex('foods').insert({
          id: 2, name: 'apple', calories: 220 }, 'id'),
        knex('foods').insert({
          id: 3, name: 'Granola Bar', calories: 300 }, 'id')
        .then(() => console.log('Seeding Foods complete'))
        .catch(error => console.log(`Error seeding foods data: ${error}`))
    ])
  });
};
