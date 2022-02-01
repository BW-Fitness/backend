/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('classes', table => {
            table.increments('class_id');
            table.string('class_id').notNullable()
            table.string('name', 100).notNullable();
            table.string('type', 100).notNullable();
            table.date('start time').notNullable();
            table.time('duration').notNullable()
            table.string('intensity level', 100).notNullable();
            table.string('location', 100).notNullable();
            table.string('current # of registered attendees', 1000).notNullable()
            table.string('max class size', 1000).notNullable()

        })
        .createTable('instructors', table => {
            table.increments('instructor_id');
            table.string('instructor_id').notNullable()

        })
        .createTable('clients', table => {
            table.increments('client_id');
            table.string('client_id').notNullable()

        })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('clients');
    return knex.schema.dropTableIfExists('instructors');
    return knex.schema.dropTableIfExists('classes');
};
