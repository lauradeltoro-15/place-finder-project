const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')


//Models
const User = require('../../../models/user.model')
const Person = require('../../../models/person.model')
const Event = require('../../../models/event.model')
//const ObjectId = require('mongoose').Types.ObjectId; 


//Helper functions 


//Endpoints


//Create event

router.post('/create', (req, res, next) => {

    Event
        .create(req.body)
        .then(response => console.log(response.data))
        .catch(err => next(err))

})

//get events of a person

router.get('/:person_id', (req, res, next)=> {

    Event
        .find( {owner: req.params.person_id})
        .then(response => res.json(response))
        .catch(err => next(err))

})

module.exports = router