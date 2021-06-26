import express from 'express';
import mongoose from 'mongoose';
import Team from '../models/Team';


const router = express.Router();


router.get('/:teamId', async (req, res) => {
  try {
      // View post with id = req.params.postId
      console.log(`Find by teamId : ${req.params.teamId}`)
      //Check if is a valid MongoDB Id
      let valid = mongoose.Types.ObjectId.isValid(req.params.teamId);
      if (!valid) {
          return res.status(400).send({error: 'Not a valid ObjectId for post'})
      }
      let team = await Team.findById(req.params.teamId)       
      if (!team) {
          return res.status(401).send({error: 'Post not found'})
      }
      res.status(200).send(team);
  } catch (error) {
      res.status(400).send(error)
  }
})

router.get('/byuser/:userId', async (req, res) => {
  try {
      // View post with id = req.params.postId
      console.log(`Find by userId : ${req.params.userId}`)
      //Check if is a valid MongoDB Id
      let valid = mongoose.Types.ObjectId.isValid(req.params.userId);
      if (!valid) {
          return res.status(400).send({error: 'Not a valid ObjectId for post'})
      }
      let team = await Team.find({ user: req.params.userId }).exec();
      if (!team) {
          return res.status(401).send({error: 'Post not found'})
      }
      res.status(200).send(team);
  } catch (error) {
      res.status(400).send(error)
  }
})

router.post('/', async (req, res) => {
  // Create a new Team    
  console.log(req.body);
  try {
    const team = new Team(req.body);
    await team.save()
    res.status(201).send({ team });
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
