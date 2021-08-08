const { createNewUser } = require("../controllers/register.controller");
const router = require("express").Router();

router.route("/").post(createNewUser);

module.exports = router;
