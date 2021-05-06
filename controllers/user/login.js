const bcrypt = require("bcryptjs");
var token_key = require("../../config/development");
const {
  User
} = require("../../database/models");
var jwt = require('jsonwebtoken');
const Yup = require("yup");
const formSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 8 symbols")
    .max(50, "Maximum 199 symbols")
    .required("Password is required"),
});

const login = async (req, res, next) => {
  console.log(token_key.token)
  try {
    const { email, password } = req.body;

    const isValid = await formSchema.isValid({ ...req.body });

    if (!isValid) throw new Error("ValidationError");

    const user = await User.findOne({
      where: {
        email,
      }
    });

    if (!user) throw new Error("EMAIL_NOT_CORRECT");

    const passIsValid = await bcrypt.compare(password, user.password);

    if (!passIsValid) throw new Error("PASSWORD_NOT_CORRECT");

    var token = jwt.sign({ email: email }, token_key.token);

     res.send({
      statusCode: 200,
      data: {
        ...user
      },
      token: token,
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    switch (error.message) {
      case "ValidationError":
        res.status(422).send({
          statusCode: 422,
          message: "Validation Error",
        });
        break;
      case "EMAIL_NOT_CORRECT":
        res.status(401).send({
          statusCode: 401,
          message: "Check Your Email",
        });
        break;
      case "PASSWORD_NOT_CORRECT":
        res.status(401).send({
          statusCode: 401,
          message: "Check Your Password",
        });
        break;
      default:
        next(error);
        break;
    }
  }
};

module.exports = login;
