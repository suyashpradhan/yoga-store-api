const express = require("express");
const router = express.Router();

const { createUserBagDocument,
  fetchUserBag,
  actionOnBag,
  emptyBag } = require("../controllers/bag.controller");

router.use(createUserBagDocument);

router.route("/")
  .get(fetchUserBag)
  .post(actionOnBag)
  .delete(emptyBag);

module.exports = router;
