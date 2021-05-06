const bcrypt = require("bcryptjs");
var token_key = require("../../config/development");
const {
  User
} = require("../../database/models");
var jwt = require('jsonwebtoken');

const update = async (req, res, next) => {
  console.log(token_key.token)
  try {
    const { token, first_name, last_name } = req.body;

    if (token) {
      jwt.verify(token, token_key.token, async function (err, decoded) {
        if (decoded && decoded.email) {
          console.log(decoded.email)
          console.log(last_name)

          if (first_name) {
            await User.update(
              {
                first_name: first_name,
              },
              {
                where: {
                  email: decoded.email,
                },
              }
            );
          } else if (last_name) {
            await User.update(
              {
                last_name: last_name,
              },
              {
                where: {
                  email: decoded.email,
                },
              }
            );
          }

          res.send({
            statusCode: 200,
            message: "Success",
          });
        } else {
          throw new Error("ValidationError");
        }

      });
    } else {
      throw new Error("ValidationError");
    }

  } catch (error) {
    console.log(error);
    switch (error.message) {
      case "NOT_CORRECT":
        res.status(401).send({
          statusCode: 401,
          message: "the user not exist",
        });
        break;
      default:
        next(error);
        break;
    }
  }
};

module.exports = update;