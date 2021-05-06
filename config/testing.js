module.exports = {
  database: {
    name: "Atechy",
    username: "Atechy",
    password: "1",
    port: "5432",
    host: "localhost",
    protocal: "postgres",
  },
  server: {
    S_SYNC: "1",
    port: 4000,
    hostname: "localhost",
    secret: process.env.SECRET,
  },
};
