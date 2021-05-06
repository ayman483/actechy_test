const bcrypt = require("bcryptjs");
var token_key = require("../../config/development");
const {
  Support_ticket
} = require("../../database/models");

const login = async (req, res, next) => {
  try {
    const support_ticket = await Support_ticket.findAll({
    });

    res.send({
      statusCode: 200,
      data: {
        ...support_ticket
      },
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    switch (error.message) {
      default:
        next(error);
        break;
    }
  }
};

module.exports = login;
