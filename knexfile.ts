import type { Knex } from "knex";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const config: { [key: string]: Knex.Config } = {
    development: {
        client: "sqlite3",
        connection: {
            filename: "./data.sqlite",
        },
        migrations: {
            directory: "./migrations",
        },
        useNullAsDefault: true,
    },
};

export default config;