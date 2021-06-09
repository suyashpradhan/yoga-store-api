const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env['TOKEN_SECRET']

const maxAge = 1*24*60*60

const createToken = (id)=>{
  return jwt.sign({id},TOKEN_SECRET,{expiresIn:maxAge})
}


module.exports = createToken