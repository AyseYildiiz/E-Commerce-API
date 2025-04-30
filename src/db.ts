// SQLite connection with Knex
import knex from "knex";
const db = knex({
    client: "sqlite3",
    connection: {
        filename: "./data.sqlite",
    },
    useNullAsDefault: true,
});
export default db;