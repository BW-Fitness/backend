exports.seed = function(knex) {

  return knex('table_name').del()
    .then(function () {
      return knex('table_name').insert([
        {client_name: 'Sean van der Wal', password: '1234', role: 'client'},
        {client_name: 'Markeisha Wallace', password: '1234', role: 'client'},
        {client_name: 'Jacob Barnett', password: '1234', role: 'client'}
      ]);
    });
};
