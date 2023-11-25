//Import required modules
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

//Set variables
const JWTPRIVATEKEY = "GoodSecret!"; //This is the encryption key for the passwords

//Set the user Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
});

//Set the token variable
const token = jwt.sign({ _id: this._id }, JWTPRIVATEKEY, {
  expiresIn: "1h",
});
userSchema.methods.generateAuthToken = function () {
  return token;
};

//Set the User variable
const User = mongoose.model("user", userSchema);

//Set the validation               
const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
	  password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { User, token };