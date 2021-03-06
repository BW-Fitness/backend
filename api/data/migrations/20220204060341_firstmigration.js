/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async(knex) => {
   await knex.schema
        .createTable('clients', (table) => {
            table.increments('client_id')
            table.string('client_name', 64).notNullable()
            table.string('password').notNullable()
            table.string('role', 8).defaultTo('client')
            table.timestamps(false, true)
        })
        .createTable('instructors', table => {
            table.increments('instructor_id')
            table.string('instructor_name').notNullable()
            table.string('role', 12).defaultTo('instructor')
            table.string('password').notNullable()
        })
        .createTable('classes', table => {
            table.increments('class_id')
            table.string('class_name').notNullable()
            table.string('start_time').notNullable()
            table.string('class_type').notNullable()
            table.string('duration').notNullable()
            table.integer('intensity_level').notNullable()
            table.string('location').notNullable()
            table.integer('current_clients').defaultTo(0)
            table.integer('max_class_size').notNullable()
            table.integer('instructor_id')
                .unsigned()
                .notNullable()
                .references('instructor_id')
                .inTable('instructors')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        })
        .createTable('client_reservations', table => {
            table.increments('cr_id')
            table.integer('class_id')
                .unsigned()
                .notNullable()
                .references('class_id')
                .inTable('classes')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            table.integer('client_id')
                .unsigned()
                .notNullable()
                .references('client_id')
                .inTable('clients')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        })
        .createTable('client_punch_card', table => {
            table.increments('pc_id')
            table.integer('cr_id')
                .unsigned()
                .notNullable()
                .references('cr_id')
                .inTable('client_reservations')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            table.integer('client_id')
                .unsigned()
                .notNullable()
                .references('client_id')
                .inTable('clients')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            table.integer('class_id')
                .unsigned()
                .notNullable()
                .references('class_id')
                .inTable('classes')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            table.integer('current_class_num').defaultTo(0)
            table.integer('max_class_num').defaultTo(6)
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = async function(knex) {
   await knex.schema.dropTableIfExists('client_punch_card')
  await knex.schema.dropTableIfExists('client_reservations')
    await knex.schema.dropTableIfExists('classes')
    await knex.schema.dropTableIfExists('instructors')
    await knex.schema.dropTableIfExists('clients')
};
