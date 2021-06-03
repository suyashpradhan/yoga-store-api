const express = require("express");
const router = express.Router();
const { Cart } = require("../models/cart.model");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const cartItem = await Cart.find().populate("_id");
      const getCartItem = cartItem.map((item) => {
        const { _id, ...doc } = item._id._doc;
        return {
          _id: _id,
          ...doc,
          quantity: item.quantity,
        };
      });
      res.json(getCartItem);
    } catch (error) {
      res
        .status(400)
        .send({ success: false, message: "unable to show cart items" });
    }
  })
  .post(async (req, res) => {
    try {
      const product = req.body;
      const { _id, quantity } = product;
      const cartItem = new Cart({ _id: _id, quantity,  });
      await cartItem.save();
      res.status(201).json(product);
    } catch (error) {
      res
        .status(400)
        .send({ success: false, message: "unable to add to cart" });
    }
  });

router
  .route("/:_id")
  .post(async (req, res) => {
    try {
      const { quantity } = req.body;
      const { _id } = req.params;
      await Cart.findByIdAndUpdate(_id, { quantity });
      res.status(201).json({ _id,quantity });
    } catch (error) {
      res
        .status(400)
        .send({ success: false, message: "unable to update cart item" });
    }
  })
  .delete(async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params._id);
      res.status(204).json({});
    } catch (error) {
      res
        .status(400)
        .send({ success: false, message: "unable to delete cart item" });
    }
  });

module.exports = router;
