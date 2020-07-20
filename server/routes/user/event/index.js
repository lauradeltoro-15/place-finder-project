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
        .then(response => console.log(response.data))
        .catch(err => next(err))

})

//get one event

router.get('/event/:userId', (req, res, next) => {

    Event
        .findById(req.params.userId)
        .then(response => res.json(response))
        .catch(err => next(err))

})

router.post('/event/:userId', (req, res, next) => {

    Event
        .findByIdAndUpdate(req.params.userId, req.body)
        .then(response => res.json(response))
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