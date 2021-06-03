const express = require("express");
const { User } = require("../models/users.model")
const { schema } = require("../models/users.model")
const router = express.Router()

router.route("/").post(async (req, res) => {

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).json({ success: false, errorMessage: error.details[0].message })

  const { fullName, userName, email, password } = req.body;

  const emailExists = await User.findOne({ email: req.body.email })
  if (emailExists) return res.status(401).json({ success: false, message: "Email Already Exists, try signing in." });

  try {
    const user = await new User({ fullName, userName, email, password });
    const savedUser = await user.save()
    res.status(200).json({ success: tremailue, message: "user created", user: savedUser })
  } catch (error) {
    res.status(400).json({ success: true, message: "Error while creating user", errorMessage: error })
  }
})

module.exports = router