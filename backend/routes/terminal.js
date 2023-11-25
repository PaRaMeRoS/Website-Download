//Import required modules
const fs = require("fs");
const router = require("express").Router();
const { token } = require("../models/user");

//Set Time for Logging
const currentdate = new Date(); 
const datetime = "[" + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + "] ";

//Set variables
var input;
var directory;
var directory2;
var process;

//Loading Terminal Command
router.post("/load/:dynamic", (req, res) => {
  const { dynamic } = req.params;
  const { key } = req.query;

  if (key == token) {
    fs.readdir('./python-terminal', (err, files) => {
      if (err)
        console.log('\x1b[31m%s\x1b[0m', datetime + err);
      else {
          //Send Commands to Phyton
          fs.writeFile(`/website/python-terminal/user.fll`, dynamic, (err) => {
            if (err) throw err;
          });
          fs.writeFile(`/website/python-terminal/output.fll`, "pwd", (err) => {
            if (err) throw err;
          });
          fs.writeFile(`/website/python-terminal/start.fll`, "Start!", (err) => {
            if (err) throw err;
            console.log('\x1b[33m%s\x1b[0m', datetime + dynamic + " has started processing the input: " + "pwd");
          });
          
          //Receive Commands from Phyton
          fs.readFile(`/website/python-terminal/user.fll`, "utf8", (err, data) => {
            if (err) throw err;
            if (data != dynamic) {
              res.status(400).json({ directory: "ERROR" });
//Noch nicht Englisch
              console.log('\x1b[31m%s\x1b[0m', datetime + dynamic + " hat error mit einem Anderem User!");
            } else {
              fs.readFile(`/website/python-terminal/directory.fll`, "utf8", (err, data) => {
                if (err) throw err;
                directory = data;
                if (directory = "") {
                  res.status(200).json({ directory: `<span class="span">${dynamic}@PaRaMeRoS.de:</span><span class="color2">${directory}</span><span class="span">$</span>` });
                  console.log('\x1b[32m%s\x1b[0m', datetime + dynamic + " has the directory loaded successfully");
                } else {
                  fs.readFile(`/website/python-terminal/directory.fll`, "utf8", (err, data) => {
                    if (err) throw err;
                    directory2 = data;
                    res.status(200).json({ directory: `<span class="span">${dynamic}@PaRaMeRoS.de:</span><span class="color2">${directory2}</span><span class="span">$</span>` });
                    console.log('\x1b[32m%s\x1b[0m', datetime + dynamic + " has the directory loaded successfully");
                  });
                }
              });
            }
          });
        }
    });
  } else {
    console.log('\x1b[31m%s\x1b[0m', datetime + "Invalid token!");
    res.status(400).json({ directory: "ERROR" });
  }
});

//Terminal Commands
router.post("/:dynamic", (req, res) => {
  const { dynamic } = req.params;
  const { key } = req.query;
  const { parcel } = req.body;

  if (key == token) {
  fs.readdir('/website/python-terminal/', (err, files) => {
    if (err)
      console.log('\x1b[31m%s\x1b[0m', datetime + err);
    else {
          if (!parcel) {
            return res
              .status(400)
              .send({ text: "ERROR", directory: "ERROR", status: "failed" });
          }

          //Send Commands to Phyton
          fs.writeFile(`/website/python-terminal/user.fll`, dynamic, (err) => {
            if (err) throw err;
          });
          fs.writeFile(`/website/python-terminal/output.fll`, parcel, (err) => {
            if (err) throw err;
          });
          fs.writeFile(`/website/python-terminal/start.fll`, "Start!", (err) => {
            if (err) throw err;
            console.log('\x1b[33m%s\x1b[0m', datetime + dynamic + " has started processing the input: " + parcel);
          });
          
          //Check if Phyton is finished Proccessing
          let check = function () {
            setTimeout(function () {
              if (process === "Done!") receive();
              else {
                fs.readFile(`/website/python-terminal/user.fll`, "utf8", (err, data) => {
                  if (err) throw err;
                  if (data != dynamic) {
                    res.status(400).json({ directory: "ERROR" });
//Noch nicht Englisch
                    console.log('\x1b[31m%s\x1b[0m', datetime + dynamic + " hat error mit einem Anderem User!");
                  } else {
                    fs.readFile(`/website/python-terminal/start.fll`, "utf8", (err, data) => {
                      if (err) throw err;
                      process = data;
                    });
                    check();
                  }
                });
              }
            }, 500);
          };
          check();

          //Receive Commands from Phyton
          function receive() {
            fs.readFile(`/website/python-terminal/user.fll`, "utf8", (err, data) => {
              if (err) throw err;
              if (data != dynamic) {
                res.status(400).json({ directory: "ERROR" });
//Noch nicht Englisch
                console.log('\x1b[31m%s\x1b[0m', datetime + dynamic + " hat error mit einem Anderem User!");
              } else {
                process = "";
                fs.writeFile(`/website/python-terminal/start.fll`, "", (err) => {
                  if (err) throw err;
                });
                fs.readFile(`/website/python-terminal/input.fll`, "utf8",(err, data) => {
                  if (err) throw err;
                  input = data;
              
                  fs.readFile(`/website/python-terminal/directory.fll`, "utf8", (err, data) => {
                    if (err) throw err;
                    directory = data;
                  
                    console.log('\x1b[32m%s\x1b[0m', datetime + dynamic + " has successfully completed processing the input: \n" + input);
                    res.status(200).json({
                      text: input,
                      directory: `<span class="span">${dynamic}@PaRaMeRoS.de:</span><span class="color2">${directory}</span><span class="span">$</span>`,
                      status: "authorized",
                    });
                  });
                });
              }
            }); 
          }
//????????
          setTimeout(() => {
            fs.writeFile(`/website/python-terminal/input.fll`, "", (err) => {
              if (err) throw err;
            });
          }, 5000);
//????????
        }
    });
  } else {
    console.log('\x1b[31m%s\x1b[0m', datetime + "Invalid token!");
    res.status(400).json({ text: "ERROR", directory: "ERROR", status: "failed" });
  }
});

module.exports = router;