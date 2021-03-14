import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("devs", (table) => {
    table.increments();
    table.string("username").notNullable().unique();
    table.string("notes");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("devs");
}
