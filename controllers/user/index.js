const router = require("express").Router();

const signUp = require("./sign-up");
const isAuth = require("./is-auth");
const login = require("./login");
const update = require("./update");

router.post("/update", update);
router.post("/is_auth", isAuth);
router.post("/login", login);
router.post("/sign-up", signUp);

module.exports = router;
