//Import required modules
const router = require('express').Router();
const Hobby = require('../models/hobby');
const { token } = require('../models/user');

//Set variables
var hobbies;

//Set Time for Logging
const currentdate = new Date(); 
const datetime = '[' + currentdate.getDate() + '/'
                + (currentdate.getMonth()+1)  + '/' 
                + currentdate.getFullYear() + ' '  
                + currentdate.getHours() + ':'  
                + currentdate.getMinutes() + ':' 
                + currentdate.getSeconds() + '] ';

//Create Event
router.post('/:dynamic', async (req, res) => {
  const { dynamic } = req.params;
  const { key } = req.query;
  const newHobby = new Hobby(req.body);

  if (key == token) {
    try {
      const savedHobby = await newHobby.save();

      res.status(200).json(savedHobby);
      console.log('\x1b[32m%s\x1b[0m', datetime + dynamic + ' has created a new hobby: ' + req.body.title);
    } catch (err) {
      res.status(400).json('ERROR');
      console.log('\x1b[31m%s\x1b[0m', datetime + 'Error creating a new hobby: ' + err);
    }
  } else {
    console.log('\x1b[31m%s\x1b[0m', datetime + 'Invalid token! | IP: "' + req.socket.remoteAddress + '"');
    res.status(400).json('ERROR');
  };
});

//Update Event
router.put('/:dynamic', async (req, res) => {
  const { dynamic } = req.params;
  const { key } = req.query;
  const { id } = req.query;

  if (key == token) {
    try {
      const hobby = await Hobby.findById({ _id: id });
      const updatedHobby = await Hobby.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedHobby);

      if (hobby.title == req.body.title) {
        console.log('\x1b[32m%s\x1b[0m', datetime + dynamic + ' has updated a hobby: ' + hobby.title + ' (desc: ' + hobby.desc + ' to ' + req.body.desc + ')');
      } else if (hobby.desc == req.body.desc) {
        console.log('\x1b[32m%s\x1b[0m', datetime + dynamic + ' has updated a hobby: ' + hobby.title + ' to ' + req.body.title);
      } else {
        console.log('\x1b[32m%s\x1b[0m', datetime + dynamic + ' has updated a hobby: ' + hobby.title + ' to ' + req.body.title + ' (desc: ' + hobby.desc + ' to ' + req.body.desc + ')');
      }
    } catch (err) {
      res.status(400).json('ERROR');
      console.log('\x1b[31m%s\x1b[0m', datetime + 'Error updating a hobby: ' + err);
    }
  } else {
    console.log('\x1b[31m%s\x1b[0m', datetime + 'Invalid token! | IP: "' + req.socket.remoteAddress + '"');
    res.status(400).json('ERROR');
  };
});

//Delete Event
router.delete('/:dynamic', async (req, res) => {
  const { dynamic } = req.params;
  const { key } = req.query;
  const { id } = req.query;

  if (key == token) {
    try {
      const hobby = await Hobby.findById({ _id: id });
      await hobby.deleteOne();

      res.status(200).json('Hobby has been deleted...');
      console.log('\x1b[32m%s\x1b[0m', datetime + dynamic + ' has deleted a hobby: ' + hobby.title);
    } catch (err) {
      res.status(400).json('ERROR');
      console.log('\x1b[31m%s\x1b[0m', datetime + 'Error deleting a hobby: ' + err);
    }
  } else {
    console.log('\x1b[31m%s\x1b[0m', datetime + 'Invalid token! | IP: "' + req.socket.remoteAddress + '"');
    res.status(400).json('ERROR');
  };
});

//Get Event
router.get('/:id', async (req, res) => {
  try {
    const hobby = await Hobby.findById(req.params.id);

    res.status(200).json(hobby);
    //console.log('\x1b[32m%s\x1b[0m', datetime + '"' + req.socket.remoteAddress + '"' + ' has loaded: ' + req.params.id);
  } catch (err) {
    res.status(400).json('ERROR');
    //console.log('\x1b[31m%s\x1b[0m', datetime + '"' + req.socket.remoteAddress + '"' + ' has an error loading: ' + req.params.id + ' | ' + err);
  }
});

//Get All Events
router.get('/', async (req, res) => {
  const { user } = req.query;
  const { cat } = req.query;

  try {
    if (user) {
      hobbies = await Hobby.find({ user });
    } else if (cat) {
      hobbies = await Hobby.find({
        categories: {
          $in: [cat],
        },
      });
    } else {
      hobbies = await Hobby.find();
    }
    res.status(200).json(hobbies);
  } catch (err) {
    res.status(400).json(`ERROR ${err}`);
  }
});

module.exports = router;