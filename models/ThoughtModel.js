const {Schema, model, Types} = require('mongoose');
const moment = require('moment');
const reactionModelSchema = require('./ReactionModel');

const ThoughtModelSchema = new Schema(
    {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Looked to momentjs.com for help formating date
      get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
});
  
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
  
const Thoughts = model('Thoughts', ThoughtModelSchema);
  
module.exports = Thoughts;