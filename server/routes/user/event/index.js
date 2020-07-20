const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')


//Models
const User = require('../../../models/user.model')
const Person = require('../../../models/person.model')
const Event = require('../../../models/event.model')


//Helper functions 


//Endpoints


//Create event

router.post('/create', (req, res, next) => {

    Event
        .create(req.body)
        .then(() => res.json(''))
        .catch(err => next(err))

})

//delete event

router.get('/delete/:id', (req, res, next) => {

    Event
        .findByIdAndRemove(req.params.id)
        .then(() => res.json(''))
        .catch(err => next(err))

})

//get one event

router.get('/event/:userId', (req, res, next) => {

    Event
        .findById(req.params.userId)
        .then(response => res.json(response))
        .catch(err => next(err))

})

router.post('/event/:eventId', (req, res, next) => {

    Event
        .findByIdAndUpdate(req.params.eventId, req.body, {new: true})
        .then(() => res.json(''))
        .catch(err => next(err))

})

//get all events of a person

router.get('/:userId', (req, res, next)=> {

    Event
        .find( {owner: req.params.userId})
        .then(response => res.json(response))
        .catch(err => next(err))

})


module.exports = router