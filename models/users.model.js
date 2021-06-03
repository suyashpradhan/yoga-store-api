const mongoose = require("mongoose");
const Joi = require("joi")
const { Schema } = mongoose;

//User Schema
const userSchema = new Schema({
  fullName: String,
  userName: String,
  email: String,
  password: String,
  created_at: {
    type: Date,
    default: Date.now
  }
})

const schema = Joi.object({
  fullName: Joi.string().required(),
  userName: Joi.string().min(8).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required()
});

//Joi Validation
/* userSchema.methods.joiValidate = (obj) => {
  const schema = {
    fullName: Joi.types.String().required(),
    userName: Joi.types.String().min(6).max(30).required(),
    email: Joi.types.String().email().required(),
    password: Joi.types.String().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
    created: Joi.types.Date(),
  }

  return Joi.validate(obj, schema);
}
 */
const User = mongoose.model('User', userSchema);

module.exports = {User,schema};
