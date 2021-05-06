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
          id: _id,
          ...doc,
          quantity: item.quantity,
          isInCart: item.isInCart,
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
      const { id, quantity } = product;
      const cartItem = new Cart({ _id: id, quantity });
      await cartItem.save();
      res.status(201).json(product);
    } catch (error) {
      res
        .status(400)
        .send({ success: false, message: "unable to add to cart" });
    }
  });

router
  .route("/:id")
  .post(async (req, res) => {
    try {
      const { quantity } = req.body;
      const { id } = req.params;
      await Cart.findByIdAndUpdate(id, { quantity });
      res.status(201).json({ quantity });
    } catch (error) {
      res
        .status(400)
        .send({ success: false, message: "unable to update cart item" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      await Cart.findByIdAndDelete(id);
      res.status(204).json({});
    } catch (error) {
      res
        .status(400)
        .send({ success: false, message: "unable to delete cart item" });
    }
  });

module.exports = router;
