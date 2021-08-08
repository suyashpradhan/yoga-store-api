const { userLogin } = require("../controllers/login.controller.js");
const router = require("express").Router();

router.route("/").post(userLogin);

module.exports = router;
