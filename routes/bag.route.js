const express = require("express");
const router = express.Router();

const { createUserBagDocument,
  populateBag,
  addOrUpdateProductInBag,
 } = require("../controllers/bag.controller");

router.use(createUserBagDocument);

router.route("/")
  .get(populateBag)
  .post(addOrUpdateProductInBag)

module.exports = router;
