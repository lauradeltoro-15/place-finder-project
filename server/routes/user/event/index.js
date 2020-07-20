const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const ValidationHandler = require("../../../validationHandler")
const validationHandler = new ValidationHandler()

//Models
const User = require('../../../models/user.model')
const Person = require('../../../models/person.model')
const Event = require('../../../models/event.model')


//Helper functions 
const isFormValidated = (event, res) => {
    return validationHandler.areRequiredFieldsFilled(event, res, "name", "description", "date", "city") &&
        validationHandler.isFieldLongEnough(event.name, res, 2, "name") &&
        validationHandler.isFieldTooLong(event.name, res, 20, "description") &&
        validationHandler.isFieldTooLong(event.description, res, 500, "description") &&
        validationHandler.isFutureDate(event.date, res)
}

//Endpoints


//Create event

router.post('/create', (req, res, next) => {
isFormValidated(req.body, res) &&
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

router.post('/event/:userId', (req, res, next) => {
    isFormValidated(req.body, res) &&
    Event
        .findByIdAndUpdate(req.params.userId, req.body, {new: true})
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