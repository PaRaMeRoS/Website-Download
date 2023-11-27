//Import required modules
const mongoose = require("mongoose");

//Set variables
const DB ="mongodb://127.0.0.1/PaRaMeRoS";

//const DB ="mongodb+srv://Admin:Admin123@cluster0.j1v5fxj.mongodb.net?retryWrites=true&w=majority";
//const DB ="mongodb://127.0.0.1:27017";

//Set Time for Logging
const currentdate = new Date(); 
const datetime = "[" + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + "] ";

module.exports = () => {
  //Trying to connect to the database
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  setTimeout(function () {
    try {
      mongoose.connect(DB, connectionParams);
      console.log('\x1b[32m%s\x1b[0m', datetime + "Connected to the database successfully");
    } catch (err) {
      console.log('\x1b[31m%s\x1b[0m', datetime + err);
      console.log('\x1b[31m%s\x1b[0m', datetime + "Could not connect to the database!");
    }
  }, 1);
};