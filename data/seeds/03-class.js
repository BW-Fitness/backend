
exports.seed = function(knex) {
  return knex('classes').del()
    .then(function () {
      return knex('classes').insert([
        {class_name: 'Boxing', start_time: '9:00 a.m.', class_type:'Cardio', duration: '45 mins', intensity_level: 3, location: 'Room 2', max_class_size: 30, instructor_id: 1},
        {class_name: 'Weight Training', start_time: '4:00 p.m.', class_type:'Conditioning', duration: '1.5 hrs', intensity_level: 2, location: 'Room 2', max_class_size: 30, instructor_id: 1},
        {class_name: 'Calisthenics', start_time: '12:00 a.m.', class_type:'Strength', duration: '1 hrs', intensity_level: 3, location: 'Room 3', max_class_size: 30, instructor_id: 1}
      ]);
    });
};
