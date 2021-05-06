const Sequelize = require("sequelize");

const sequelize = new Sequelize('postgres://postgres:483483@LOCALHOST:5432/atechy_test');

try {
  sequelize.authenticate()
    .then(() => console.log("Database connected Succesfully"))
    .catch((err) => console.log(err));

  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
module.exports = sequelize;
