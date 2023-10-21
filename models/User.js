const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,    
        trim: true         
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: '/^\S+@\S+\.\S+$/'
    },
    thoughts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Thoughts',
        },
      ],
    friends: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
    ],
});

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;