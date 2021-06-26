import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User';


const router = express.Router();

router.post('/getuser', async (req, res) => {
  // Get an existing User    
  try {
    // console.log({ username: req.body.name });
    let user = await User.find(req.body).exec();    
    if (!user || !user.length) {
      return res.status(401).send({error: 'User not found'})
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/create', async (req, res) => {
  // Create a new User    
  console.log(req.body);
  try {
    const user = new User(req.body);
    await user.save()
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
