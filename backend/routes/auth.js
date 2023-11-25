//Import required modules
const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const authRoutes = router;

//Set Time for Logging
const currentdate = new Date(); 
const datetime = "[" + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + "] ";

//Set the validation               
const validate = (data) => {
	const schema = Joi.object({
		name: Joi.string().required().label("Name"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

authRoutes.post("/", async (req, res) => {
  try {
    //Check for errors
    const { err } = validate(req.body);

    if (err){
      return res.status(400).send({ message: err.details[0].message });
    } else {
      const user = await User.findOne({ name: req.body.name });      

      //Check if user exists
      if (!user) {
        return res.status(401).send({ message: "Invalid Name or Password" });
      } else {
        const Name = user.name;

        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );

        //Check if password is correct
        if (!validPassword) {
          return res.status(401).send({ message: "Invalid Name or Password" });
        } else {
          //Create a token for the user  
          const token = user.generateAuthToken();

          //Send the token to the user
	        console.log('\x1b[32m%s\x1b[0m', datetime + Name + ' has logged in | IP: "' + req.socket.remoteAddress + '"');
          res.status(200).send({ data: `${Name}?key=${token}`, message: "logged in successfully" });

          module.exports = { Name };
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

module.exports = authRoutes;