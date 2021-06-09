const express = require("express")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const { User } = require("../models/users.model")
const router = express.Router()
const TOKEN_SECRET = process.env['TOKEN_SECRET']

router.route("/").post(async (req,res)=>{
  const user = await User.findOne({userName:req.body.userName});

  if(!user) return res.status(401).json({success:false,message:"Username doesn't exists."})

  const validatePassword = await bcrypt.compare(req.body.password,user.password)
  if(!validatePassword) return res.status(401).json({success:false,message:"Invalid Credentials"})

  const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET,{expiresIn:'24h'})
  res.json({token})

})


module.exports = router