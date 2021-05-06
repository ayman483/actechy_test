const bcrypt = require("bcryptjs");
var token_key = require("../../config/development");
const {
  User
} = require("../../database/models");
var jwt = require('jsonwebtoken');

const is_auth = async (req, res, next) => {
  console.log(token_key.token)
  try {
    const { token } = req.body;

    jwt.verify(token, token_key.token, async function (err, decoded) {
      console.log(decoded.email)
      const user = await User.findOne({
        where: {
          email: decoded.email,
        }
      });

      if (!user) throw new Error("NOT_CORRECT");

      res.send({
        statusCode: 200,
        data: {
          ...user
        },
        token: token,
        message: "Success",
      });

    });

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

module.exports = is_auth;
