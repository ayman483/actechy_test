const {
  Support_ticket
} = require("../../database/models");
const Yup = require("yup");
const sequelize = require("../../database/config/connection");


const integer = /^\-?\d*$/

const formSchema = Yup.object().shape({
  message: Yup.string().required()
    .required("message is required"),
  userid: Yup.string().matches(integer, 'User id is not valid'),
});

const create = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const isValid = await formSchema.isValid({ ...req.body });
    if (!isValid) throw new Error("ValidationError");
    const {
      message,
      userid,
    } = req.body;

    // check if the user already haz
    const isSupport_ticket = await Support_ticket.findOne({
      where: {
        userid: userid
      },
    });
    if (isSupport_ticket) throw new Error("USER_ALREADY_EXIST");

    const newSupport_ticket = await Support_ticket.create(
      {
        message: message,
        userid: userid,
      },
      {
        transaction,
      }
    );


    await transaction.commit();

    res.send({
      statusCode: 200,
      message: "Create user successful", newSupport_ticket: newSupport_ticket
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
      case "USER_ALREADY_EXIST":
        res.status(401).send({
          statusCode: 401,
          message: "User Already Haz",
        });
        break;
      default:
        next(error);
        break;
    }
  }
};

module.exports = create;
