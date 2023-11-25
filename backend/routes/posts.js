//Import required modules
const router = require('express').Router();
const Post = require('../models/post');
const { token } = require('../models/user');

//Set variables
var posts;

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
  const newPost = new Post(req.body);

  if (key == token) {
    try {
      const savedPost = await newPost.save();

      res.status(200).json(savedPost);
      console.log('\x1b[32m%s\x1b[0m', datetime + dynamic + ' has created a new event: ' + req.body.title);
    } catch (err) {
      res.status(400).json('ERROR');
      console.log('\x1b[31m%s\x1b[0m', datetime + 'Error creating a new event: ' + err);
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
      const post = await Post.findById({ _id: id });
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedPost);

      if (post.title == req.body.title) {
        console.log('\x1b[32m%s\x1b[0m', datetime + dynamic + ' has updated a event: ' + post.title + ' (desc: ' + post.desc + ' to ' + req.body.desc + ')');
      } else if (post.desc == req.body.desc) {
        console.log('\x1b[32m%s\x1b[0m', datetime + dynamic + ' has updated a event: ' + post.title + ' to ' + req.body.title);
      } else {
        console.log('\x1b[32m%s\x1b[0m', datetime + dynamic + ' has updated a event: ' + post.title + ' to ' + req.body.title + ' (desc: ' + post.desc + ' to ' + req.body.desc + ')');
      }
    } catch (err) {
      res.status(400).json('ERROR');
      console.log('\x1b[31m%s\x1b[0m', datetime + 'Error updating a event: ' + err);
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
      const post = await Post.findById({ _id: id });
      await post.deleteOne();

      res.status(200).json('Post has been deleted...');
      console.log('\x1b[32m%s\x1b[0m', datetime + dynamic + ' has deleted a event: ' + post.title);
    } catch (err) {
      res.status(400).json('ERROR');
      console.log('\x1b[31m%s\x1b[0m', datetime + 'Error deleting a event: ' + err);
    }
  } else {
    console.log('\x1b[31m%s\x1b[0m', datetime + 'Invalid token! | IP: "' + req.socket.remoteAddress + '"');
    res.status(400).json('ERROR');
  };
});

//Get Event
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
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
      posts = await Post.find({ user });
    } else if (cat) {
      posts = await Post.find({
        categories: {
          $in: [cat],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json('ERROR');
  }
});

module.exports = router;