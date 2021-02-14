require('dotenv').config();

module.exports = {
  client: 'mysql',
  connection: {
    host: process.env.APP_DB_HOST || 'localhost',
    port: process.env.APP_DB_PORT || 3306,
    database: process.env.APP_DB_NAME || "graphql_finalproject",
    user: process.env.APP_DB_USER,
    password: process.env.APP_DB_PASSWORD || "",
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
