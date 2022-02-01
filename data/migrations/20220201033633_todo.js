/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('classes', table => {
            table.increments('class_id');
            table.string('name', 100).notNullable();
            table.string('type', 100).notNullable();
            table.date('start time').notNullable();
            table.time('duration').notNullable()
            table.string('intensity level', 100).notNullable();
            table.string('location', 100).notNullable();



        });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('classes');
};
