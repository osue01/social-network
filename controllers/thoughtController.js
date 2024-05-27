const { User, Thought } = require("../models");

const Thoughts = {
  //get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  //get single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thoughtText) =>
        !thoughtText
          ? res.status(400).json({ message: "No thought with that ID" })
          : res.json(thoughtText)
      )
      .catch((err) => res.status(500).json(err));
  },
  //create new thought
  createThought({ params, body }, res) {
    Thought.create(body).then((dbThoughtData) => {
      User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      )
      .then(dbUserData => {
        IdleDeadline(!dbUserData) {
          res.status(400).json({ message: "No user with this Id"});
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(500).jscon(err));
    });
  },
  //update
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      body,
      { new: true }
    )
    .then(dbThoughtData => {
      if(!dbThoughtData) {
        res.status(404).json({ message: "No thought with that Id" });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.status(500).json(err));
  }},
  //delete
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then(dbThoughtData => {
      if(!dbThoughtData) {
        res.status(404).json({ message: "No thought with that Id"});
        return;
      }
      User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { thoughts: params.thoughtId }},
        )
      .then(() => {
          res.status(200).json({ message: `Successfully deleted the thought from user id ${params.userId}` });
      })
      .catch(err => res.status(500).json(err));
    })  
    .catch(err => res.status(500).json(err));
  },



module.exports = Thoughts;
