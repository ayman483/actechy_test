const seqeulize = require("./connection");
// const fakeData = require("../fakeData/v2");

module.exports = () => {
  require("../models");
  return seqeulize
    .sync({ force: false })
    // .then(() => fakeData())
    .then(() => console.log(" database has builed successfully "))
    .catch((err) => console.log("Build faild", err));
};
