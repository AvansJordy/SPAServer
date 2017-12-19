const express = require('express');
const routes = express.Router();
const mongodb = require('../config/mongo.db');
const user = require('../model/user');
const mongoose = require('mongoose');

routes.get('/users', function(req, res) {
    res.contentType('application/json');
    user.find({})
        .then((user) => {
        res.status(200).send(user);
})
    .catch((error) => res.status(400).json(error));
});

routes.get('/users/:id', function(req, res) {
    res.contentType('application/json');
    const id = req.param('id');
    console.log(id);
    user.findOne({_id: id})
        .then((user) => {
        res.status(200).send(user);
})
    .catch((error) => res.status(400).json(error));
});

routes.post('/users', function(req, res) {
    const usersProps = req.body;

    user.create(usersProps)
        .then((user) => {
        res.status(200).send(user)
})
    .catch((error) => res.status(400).json(error))
});


routes.put('/users/:id', function(req, res) {
    res.contentType('application/json');
    const userId = req.params.id;
    const userProps = req.body;

    user.findByIdAndUpdate({_id: userId}, userProps)
        .then(()=> user.findById({_id: userId}))
    .then(user => res.send(user))
    .catch((error) => res.status(400).json(error))

});

routes.delete('/users/:id', function(req, res) {
    const id = req.param('id');
    user.findByIdAndRemove(id)
        .then((status) => res.status(200).send(status))
    .catch((error) => res.status(400).json(error))
});


module.exports = routes;