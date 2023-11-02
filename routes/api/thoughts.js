const express = require('express');
const router = express.Router();
const { User } = require('../../models/User');
const { Thoughts } = require('../../models/Thoughts');

router.get('/thoughts', async (req, res) => {
    try {
        const thoughts = await Thoughts.find();
        res.json(thoughts);
      } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      }
});

router.get('/thoughts/:id', async (req, res) => {
    try {
      const thought = await Thoughts.findById(req.params.id);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

router.post('/thoughts', async (req, res) => {
    try {
        const { thoughtText, username, userId } = req.body;

        const user = await User.findById(userId);

        const thought = new Thoughts({ thoughtText, username, userId });
        await thought.save();

        user.thoughts.push(thought._id);
        await user.save();
    
        res.status(201).json(thought);
      } catch (err) {
        res.status(400).json({ message: 'Bad Request' });
      }
    });

    router.put('/thoughts/:id', async (req, res) => {
        try {
          const { thoughtText } = req.body;
          const thoughtId = req.params.id;
      
          const thought = await Thoughts.findByIdAndUpdate(thoughtId, { thoughtText }, { new: true });
      
          if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
          }
      
          res.json(thought);
        } catch (err) {
          res.status(400).json({ message: 'Bad Request' });
        }
      });

      router.delete('/thoughts/:id', async (req, res) => {
        try {
          const thoughtId = req.params.id;
      
          const thought = await Thoughts.findByIdAndDelete(thoughtId);

          await User.findByIdAndUpdate(thought.userId, { $pull: { thoughts: thoughtId } });

          res.json({ message: 'Thought removed successfully' });
        } catch (err) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      });

      router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
        try {
            const { thoughtId } = req.params;
            const { reactionBody, username } = req.body;
        
            const thought = await Thoughts.findById(thoughtId);
            const newReaction = {
                reactionBody,
                username,
              };
          
              thought.reactions.push(newReaction);
              await thought.save();
          
              res.status(201).json(thought);
            } catch (err) {
              res.status(400).json({ message: 'Bad Request' });
            }
          });
        

      router.delete('/thoughts/:thoughtId/reactions', async (req, res) => {
        try {
            const { thoughtId } = req.params;
        
            const thought = await Thoughts.findByIdAndUpdate(thoughtId, { reactions: [] }, { new: true });
        
            if (!thought) {
              return res.status(404).json({ message: 'Thought not found' });
            }
        
            res.json({ message: 'Reaction removed from thought' });
          } catch (err) {
            res.status(500).json({ message: 'Internal Server Error' });
          }
        });
    
    module.exports = router;