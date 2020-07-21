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
        validationHandler.isFieldLongEnough(event.description, res, 20, "description") &&
        validationHandler.isFieldTooLong(event.description, res, 500, "description") &&
        validationHandler.isFutureDate(event.date, res)
}

//Endpoints

//join event

router.put('/join/:eventId/:userId', (req, res, next) => {

    Event
        .findById(req.params.eventId, {participants: 1})
        .then(event => {
            const idx = event.participants.indexOf(req.params.userId)
            if(idx == -1){
                event.participants.push(req.params.userId)
                event.save()
            }
        })
        .then(() => res.json(req.params.userId))
        .catch(err => next(err))
})

//leave event

router.put('/leave/:eventId/:userId', (req, res, next) => {

    Event
        .findById(req.params.eventId, {participants: 1})
        .then(event => {
            const idx = event.participants.indexOf(req.params.userId)
            if(idx >= 0){
                event.participants.splice(idx, 1)
                event.save()
            }
        })
        .then(() => res.json(req.params.userId))
        .catch(err => next(err))
})

//get all events
router.get('/getAllEvents', (req, res, next) => {
    
    Event
        .find()
        .then(response => res.json(response))
        .catch(err => next(err))

})

// get event owner
router.get('/getOwner/:eventId', (req, res, next) => {

    Event
        .findById(req.params.eventId)
        .populate('owner')
        .then(response => res.json(response))
        .catch(err => next(err))
})

// get events where user is owner
router.get('/:userId/owned', (req, res, next) => {
    Event
        .find({owner: req.params.userId})
        .then(response => res.json(response))
        .catch(err => next(err))
})

// get events where user is participant
router.get('/:userId/participant', (req, res, next) => {
    Event
        .find()
        .then(response => {
            console.log(response)
            res.json(response.filter(event => 
            event.participants.includes(req.params.userId)
            && event.owner != req.params.userId))
        })
        .catch(err => next(err))
})

//Create event

router.post('/create', (req, res, next) => {
    isFormValidated(req.body, res) &&
    Event
        .create(req.body)
        .then(() => res.json(''))
        .catch(err => next(err))
})

//delete event

router.delete('/delete/:id', (req, res, next) => {

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


//update event
router.put('/event/:userId', (req, res, next) => {
    isFormValidated(req.body, res) &&
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