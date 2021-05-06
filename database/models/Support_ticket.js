const Sequelize = require("sequelize");
const sequelize = require("../config/connection");

class Support_ticket extends Sequelize.Model { }

Support_ticket.init(
  {
    message: { type: Sequelize.STRING },
    userid: { type: Sequelize.INTEGER },
  },
  { tableName: "support_ticket", sequelize, modelName: "support_ticket" }
);

module.exports = Support_ticket;
