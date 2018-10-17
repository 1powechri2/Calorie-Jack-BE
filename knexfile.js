// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/calorie_jack',
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds.dev'
    }
  }

  production: {
    client: 'pg',
    connection: connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds.dev'
  },
  useNullAsDefault: true
}
