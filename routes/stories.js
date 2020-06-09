const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const {ensureAuthenticated} = require('../helpers/auth');

const Story = mongoose.model('stories');
// const User = mongoose.model('user');

//Stories Index
router.get('/', (req, res) => {
    Story.find({status:'public'})
      .then(stories => {
        res.render('stories/index', {
          stories: stories
        });
      });
  });


//Add Story Form
router.get('/add', ensureAuthenticated, (req, res) =>{
    res.render('stories/add'); 
});


//Process Add Story
router.post('/', (req, res) =>{
   let allowComments; 

   if(req.body.allowComments){
       allowComments = true
   }else{
       allowComments = false; 
   }

   const newStory = {
       title: req.body.title,
       body: req.body.body,
       staus: req.body.staus,
       allowComments:allowComments,
       user: req.user.id
   }
   new Story(newStory)
   .save()
   .then( story => {
       res.redirect(`/stories/show/${story.id}`); 
   }); 
})

module.exports = router; 