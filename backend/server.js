//Import required modules
const cors = require("cors");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const connection = require("./db");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const terminalRoutes = require("./routes/terminal");
const { token } = require("./models/user");
const app = express();
const userRoutes = router;
const path = require("path");

//Set variables
const PORT = 8080;

//Connect to database
connection();

//Load Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

//Set Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/terminal", terminalRoutes);
app.use("/images", express.static(path.join(__dirname, "./images")));

//Redirect to Frontend
app.get("/*", (req, res) => {
  res.redirect("https://www.youtube.com/watch?v=a3Z7zEc7AXQ");
});

//Set Time for Logging
const currentdate = new Date(); 
const datetime = "[" + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + "] ";

app.post("/api/upload", (req, res) => {
  const { key } = req.query;

  //Set the storage point for uploaded images
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    }
  });
  const upload = multer({ storage: storage }).single("file")

  //Check if the token is valid
  if (key == token) {
    try {
      upload(req, res, err => {
        if(err) {
          res.status(400).json("Error uploading image!");
          console.log('\x1b[31m%s\x1b[0m', datetime + "Error uploading image: " + err);
        } else {
          res.status(200).json("File has been uploaded");
          console.log('\x1b[32m%s\x1b[0m', datetime + 'Image has been uploaded! | IP: "' + req.socket.remoteAddress + '"');
        }
      });
    } catch(err) {
      console.log('\x1b[31m%s\x1b[0m', datetime + "Error uploading image: " + err);
    }
  } else {
    console.log('\x1b[31m%s\x1b[0m', datetime + 'Invalid token! | IP: "' + req.socket.remoteAddress + '"');
  };
});

const port = PORT || 8080;
app.listen(port, console.log('\x1b[33m%s\x1b[0m', datetime + `Listening on port ${port}`));