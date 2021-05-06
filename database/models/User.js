const Sequelize = require("sequelize");
const sequelize = require("../config/connection");
const Support_ticket = require("./Support_ticket");

class User extends Sequelize.Model { }

User.init(
  {
    first_name: { type: Sequelize.STRING },
    last_name: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    role: { type: Sequelize.TEXT },
  },
  { tableName: "user", sequelize, modelName: "user" }
);
// User.belongsTo(Support_ticket);
module.exports = User;
