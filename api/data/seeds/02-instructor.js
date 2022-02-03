
exports.seed = function(knex) {
  return knex('instructors').del()
    .then(function () {
      return knex('instructors').insert([
        {instructor_name: 'Jordan Cabanada', role: 'instructor', password:'1234'},
        {instructor_name: 'Claire List', role: 'instructor', password:'1234'},
        {instructor_name: 'Leo Qladimu', role: 'instructor', password:'1234'}
      ]);
    });
};
