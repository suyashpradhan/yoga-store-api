const express = require("express");
const router = express.Router();

const { createUserBagDocument,
  fetchUserBag,
  actionOnBag,
  removeProductFromBag,
  emptyBag } = require("../controllers/bag.controller");

router.use(createUserBagDocument);

router.route("/")
  .get(fetchUserBag)
  .post(actionOnBag)
  .delete(removeProductFromBag)
  .delete(emptyBag);

module.exports = router;
