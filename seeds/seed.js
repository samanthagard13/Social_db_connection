const mongoose = require('mongoose');
const { User, Thought, Reactions } = require('../models/index');
const userData = require('./userData.json');
const reactionData = require('./reactionData.json');
const thoughtData = require('./thoughtData.json');

mongoose
  .connect('mongodb://127.0.0.1:27017/socials_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

mongoose.connection.on('connected', () => {
  seedDB();
})

  const seedDB = async () => {
    try {
      await mongoose.connection.db.dropDatabase();
      await User.create(userData);
      await Thought.create(thoughtData);
      await Reactions.create(reactionData);
      console.log('Data seeded successfully.');
    } catch (error) {
      console.error('Error seeding data:', error);
    } finally {
      mongoose.connection.close();
    }
  };

