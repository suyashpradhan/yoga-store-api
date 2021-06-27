const express = require("express");
const router = express.Router();
const { Bag } = require("../models/bag.model");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const bagItem = await Bag.find().populate("_id");
      const getBagItems = bagItem.map((item) => {
        const { _id, ...doc } = item._id._doc;
        return {
          _id: _id,
          ...doc,
          quantity: item.quantity,
        };
      });
      res.json(getBagItems);
    } catch (error) {
      res
        .status(400)
        .send({ success: false, message: "unable to show bag items" });
    }
  })
  .post(async (req, res) => {
    try {
      const product = req.body;
      const { _id, quantity } = product;
      const bagItem = new Bag({ _id: _id, quantity });
      await bagItem.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(400).send({ success: false, message: "unable to add to bag" });
    }
  });

router
  .route("/:_id")
  .post(async (req, res) => {
    try {
      const { quantity } = req.body;
      const { _id } = req.params;
      await Bag.findByIdAndUpdate(_id, { quantity });
      res.status(201).json({ _id, quantity });
    } catch (error) {
      res
        .status(400)
        .send({ success: false, message: "unable to update bag item" });
    }
  })
  .delete(async (req, res) => {
    try {
      await Bag.findByIdAndDelete(req.params._id);
      res.status(204).json({});
    } catch (error) {
      res
        .status(400)
        .send({ success: false, message: "unable to delete bag item" });
    }
  });

module.exports = router;
