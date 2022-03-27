const { Thought, User } = require('../models');

const thoughtControllers = {

    getAllThoughts(req, res) {
        Thought.find({})
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    addThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'Incorrect thought data, please try again.' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    },

    updateThought({ params, body }, res) {
        Thought.findByIdAndUpdate({ _id: params.thoughtId }, body, { runValidators: true, new: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No user found with this ID, please try again.' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    },

    removeThought({ params }, res) {
        Thought.findByIdAndDelete({ _id: params.thoughtId }, { runValidators: true, new: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No user found with this ID, please try again.' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    },

    addReaction({params, body}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            { new: true, runValidators: true }
        )
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'Thats not gonna work, but try again if you feel up to it!' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    },

    removeReaction({params}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId : params.reactionId}}},
            { new: true, runValidators: true }
        )
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'There is no reaction with this ID, please try again.' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    }
}


module.exports = thoughtControllers;