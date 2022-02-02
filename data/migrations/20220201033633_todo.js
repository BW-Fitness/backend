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
            table.string('current # of registered attendees', 1000).notNullable()
            table.string('max class size', 1000).notNullable()
        })

        .createTable('instructors', table => {
            table.increments('instructor_id');
            table.string('instructor_name').unique().notNullable();
            table.string('password').notNullable();
            table.integer('class_id')
                .unsigned()
                .notNullable()
                .references ('class_id')
                .inTable('classes')
                .onDelete('RESTRICT')
                .onUpdate('RESTRICT')
        })

        .createTable('clients', table => {
            table.increments('client_id');
            table.string('client_name').unique().notNullable();
            table.string('password').notNullable();
            table.integer('class_id')
                .unsigned()
                .notNullable()
                .references('class_id')
                .inTable('classes')
                .onDelete('RESTRICT')
                .onUpdate('RESTRICT')
        })
};


exports.down = function (knex) {
    return knex.schema.dropTableIfExists('clients')
    .dropTableIfExists('instructors')
    .dropTableIfExists('classes');
};

