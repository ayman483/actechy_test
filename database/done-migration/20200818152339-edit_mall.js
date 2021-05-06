"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([
      queryInterface.addColumn("mall", "city", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("mall", "mainColor", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("mall", "subColor", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("mall", "logo", {
        type: Sequelize.TEXT,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
