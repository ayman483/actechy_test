const express = require("express");
const path = require("path");
const chalk = require("chalk");
const router = require("express").Router();
const user = require("./user");
const support_ticket = require("./support_ticket");

router.use((req, res, next) => {
  console.log(chalk.red.bgWhiteBright.bold("  URL ==>", `${req.path}  `));
  console.log(chalk.black.bgGreenBright.bold("  Body:  "), { ...req.body });
  next();
});

router.use("/api/user", user);
router.use("/api/support_ticket", support_ticket);



router.use((req, res, next) => {
  res.status(404).send({ statusCode: 404, message: "Sorry can't find that!" });
});

router.use((error, req, res, next) => {
  switch (error.name) {
    case "SequelizeValidationError":
      handleSequelizeValidationError(req, res, error);
      break;
    default:
      res.status(500).send({
        statusCode: 500,
        message: "يرجى التواصل مع الدعم الفني",
      });
  }
});

const handleSequelizeValidationError = (req, res, error) => {
  console.log(error);
  const messages = error.errors.map((error) => error.message.split(".")[1]);
  res.status(422).send({
    statusCode: 422,
    message: "validation error",
    dev: process.env.NODE_ENV !== "production" ? "sequelize" : undefined,
    body: messages,
  });
};

module.exports = router;
