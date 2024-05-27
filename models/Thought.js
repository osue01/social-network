const { Schema, model } = require('mongoose');
const reactionSchema = require('../models/Reaction');
const moment = require('moment');

//defining Thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 280
      },
      createdAt: {
        type: Date,
        //using moment utility to convert date/timestamp
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
  },
  { 
    toJSON: {
      // TODO: Mongoose will not include virtuals by default, so add a `virtuals` property and set it's value to true
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// virtual method the get total reaction count
thoughtSchema.virtual('reactionCount').get(function () {
  return `reactions: ${this.reactions.length}`;
  });


// Initialize our Thought model
const Thought = model('Thought', thoughtSchema);

//export Thought model
module.exports = Thought;