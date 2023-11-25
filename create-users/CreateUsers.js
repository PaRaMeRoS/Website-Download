//Import required modules
const Joi = require("joi");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

//Set the variables
Users = ["Max", "David", "Carl", "Alex", "Noah", "Basti", "Nathan", "Anna", "Maria", "Coach!"]
Passwords = ["Maxi123!", "David123!", "Carl123!", "Alex123!", "Noah123!", "Basti123!", "Nathan123!", "Anna123!", "Maria123!", "Coach123!"]
const DB = "mongodb://database/PaRaMeRoS";
const SALT = 15

//Set Time for Logging
const currentdate = new Date(); 
const datetime = "[" + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + "] ";

//Trying to connect to the database
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
try {
  mongoose.connect(DB, connectionParams);
  console.log('\x1b[32m%s\x1b[0m', datetime + "Connected to the database successfully");
} catch (err) {
  console.log('\x1b[31m%s\x1b[0m', datetime + err);
  console.log('\x1b[32m%s\x1b[0m', datetime + "Could not connect to the database!");
}

//Set the user Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
});

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

//Create Users
Users.forEach (async (NewUser, index) => {
  const Password = Passwords[index];
  const body = {name: NewUser, password: Password}

  try {
    const { error } = validate(body);
    if (error)
      return console.log('\x1b[31m%s\x1b[0m', datetime + error.details[0].message);

    const user = await User.findOne({ name: body.name });
    if (user)
      return console.log('\x1b[31m%s\x1b[0m', datetime + `User with the Name ${body.name} already exist.`);

    const salt = await bcrypt.genSalt(Number(SALT));
    const hashPassword = await bcrypt.hash(body.password, salt);

    await new User({ ...body, password: hashPassword }).save();
    console.log('\x1b[32m%s\x1b[0m', datetime + `Created user ${body.name} successfully.`);
  } catch (error) {
    console.log('\x1b[31m%s\x1b[0m', datetime + `Internal Server Error (${error})`);
  }
});

return(true)