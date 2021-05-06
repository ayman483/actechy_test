module.exports = {
  database: {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
  },
  server: {
    port: process.env.PORT,
    hostname: process.env.HOSTNAME,
    secret: process.env.SECRET,
  },
};
