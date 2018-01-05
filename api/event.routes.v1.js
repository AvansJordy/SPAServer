/**
 * Created by Jordy Frijters on 18-12-2017.
 */
const express = require('express');
const routes = express.Router();
const mongodb = require('../config/mongo.db');
const events = require('../model/event.model');
const mongoose = require('mongoose');

routes.get('/events', function(req, res) {
    res.contentType('application/json');
    events.find({})
        .populate({
            path: 'events'
        })
        .then((events) => {
            console.log(events[0].users[0]);
            res.status(200).json(events);
        })
        .catch((error) => res.status(400).json(error));
});


routes.get('/events/:id', function(req, res) {
    res.contentType('application/json');
    const id = req.param('id');

    events.findOne({_id: id})
        .populate({
            path: 'users'
        })
        .then((events) => {
            res.status(200).send(events
            );
        })
        .catch((error) => res.status(400).json(error));
});

routes.post('/events', function(req, res) {
    const eventsProps = req.body;

    events.create(eventsProps)
        .then((events) => {
            res.status(200).send(events)
        })
        .catch((error) => res.status(400).json(error))
});


routes.put('/events/:id', function(req, res) {
    res.contentType('application/json');
    const eventId = req.params.id;
    const eventProps = req.body;

    events.findByIdAndUpdate({_id: eventId}, eventProps)
        .then(()=> events.findById({_id: eventId}))
        .then(events => res.send(events))
        .catch((error) => res.status(400).json(error))

});

routes.delete('/events/:id', function(req, res) {
    const id = req.param('id');
    events.findByIdAndRemove(id)
        .then((status) => res.status(200).send(status))
        .catch((error) => res.status(400).json(error))
});


module.exports = routes;