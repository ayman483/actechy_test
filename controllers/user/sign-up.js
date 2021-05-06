const {
  User
} = require("../../database/models");
const Yup = require("yup");
const sequelize = require("../../database/config/connection");
const bcrypt = require("bcryptjs");


const formSchema = Yup.object().shape({
  first_name: Yup.string().required()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("first_name name is required"),
  last_name: Yup.string(),
  // role: Yup.string(),
  email: Yup.string().email("Wrong email format").required("Email is required"),
  password: Yup.string()
    .min(3, "Minimum 8 symbols")
    .max(50, "Maximum 199 symbols")
    .required("Password is required"),
});

const signUp = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const isValid = await formSchema.isValid({ ...req.body });
    if (!isValid) throw new Error("ValidationError");
    const {
      first_name,
      last_name,
      password,
      email,
      role
    } = req.body;

    // check if the emails already exist
    const isUser = await User.findOne({
      where: {
        email: email
      },
    });
    if (isUser) throw new Error("EMAIL_ALREADY_EXIST");

    // check if the role not correct  
    if (role != 'admin' && role != 'user') throw new Error("ROLE_NOT_CORRECT");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create(
      {
        first_name,
        last_name,
        password: hashedPassword,
        email: email,
        role
      },
      {
        transaction,
      }
    );


    await transaction.commit();

    res.send({
      statusCode: 200,
      message: "Create user successful", newUser: newUser
    });
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    switch (error.message) {
      case "ValidationError":
        res.status(422).send({
          statusCode: 422,
          message: "Validation Error",
        });
        break;
      case "ROLE_NOT_CORRECT":
        res.status(401).send({
          statusCode: 401,
          message: "Role _Not Correct",
        });
        break;
      case "EMAIL_ALREADY_EXIST":
        res.status(401).send({
          statusCode: 401,
          message: "Email Already Exist",
        });
        break;
      default:
        next(error);
        break;
    }
  }
};

module.exports = signUp;
