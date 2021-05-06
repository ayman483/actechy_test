const router = require("express").Router();

const create = require("./create");
const get = require("./get");

router.post("/create", create);
router.post("/get", get);

module.exports = router;
