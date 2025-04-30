import knex from "knex";

export async function up (knexInstance:knex.Knex):Promise<void>{
    await knexInstance.schema.createTable("users",(table)=>{
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("email").unique().notNullable();
        table.string("password").notNullable();
        table.timestamps(true, true);
    });
    await knexInstance.schema.createTable("products",(table)=>{
        table.increments("id").primary();
        table.string("name").notNullable();
        table.text("description");
        table.decimal("price", 10, 2).notNullable();
        table.integer("stock").defaultTo(0);
    });
}
export async function down(knexInstance: knex.Knex):Promise<void>{
    await knexInstance.schema.dropTableIfExists("products");
    await knexInstance.schema.dropTableIfExists("users");
}