const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User, Thoughts } = require('../models/');

router.get('/users', async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .populate('thoughts')
        .populate('friends');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.post('/users', async (req, res) => {
    try {
      const { username, email } = req.body;
      const user = new User({ username, email });
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: 'Bad Request' });
    }
  });

  router.put('/users/:id', async (req, res) => {
    try {
      const { username, email } = req.body;
      const updatedUser = await User.findByIdAndUpdate(req.params.id, { username, email }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: 'Bad Request' });
    }
  });

  router.delete('/users/:id', async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      } 
      
      await Thoughts.deleteMany({ username: deletedUser.username });
    
      res.json({ message: 'User and associated thoughts deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.post('/api/users/:userId/friends/:friendId', async (req, res) => {
    try {
      const { userId, friendId } = req.params;
      const user = await User.findById(userId);
      const friend = await User.findById(friendId);
      user.friends.push(friendId);
      await user.save();
  
      res.json({ message: 'Friend added successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

  router.delete('/api/users/:userId/friends/:friendId', async (req, res) => {
    try {
      const { userId, friendId } = req.params;
      const user = await User.findById(userId);

      const friendIndex = user.friends.indexOf(friendId);

      user.friends.splice(friendIndex, 1);
      await user.save();
      res.json({ message: 'Friend removed successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  module.exports = router;