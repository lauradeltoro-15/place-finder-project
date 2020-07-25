const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require("passport")


const ValidationHandler = require("../../../validationHandler")
const validationHandler = new ValidationHandler()

//Models
const User = require('../../../models/user.model')
const Person = require('../../../models/person.model')
const Event = require('../../../models/event.model')



//Helper functions 

const isLoggedIn = (req, res, next) =>  req.isAuthenticated() ? next() : null
const isTheUserAllowed = (req, res, next) => req.user.id === req.params.id ? next() : null

const isFormValidated = (event, res) => {
    return validationHandler.isNameUnique(Event, event.name, res)
        .then(isNameUnique => {
            return isNameUnique &&
                validationHandler.areRequiredFieldsFilled(event, res, "name", "description", "startTime", "endTime", "city") &&
                validationHandler.isFieldLongEnough(event.name, res, 2, "name") &&
                validationHandler.isFieldTooLong(event.name, res, 40, "name") &&
                validationHandler.isFieldLongEnough(event.description, res, 20, "description") &&
                validationHandler.isFieldTooLong(event.description, res, 500, "description") &&
                validationHandler.isFutureDate(new Date(), event.startTime, res) &&
                validationHandler.isFutureDate(new Date(event.startTime), event.endTime, res)
        })


}

//Endpoints

//join event

router.put('/join/:eventId/:id', isLoggedIn, isTheUserAllowed, (req, res, next) => {
    Event
        .findById(req.params.eventId, { participants: 1 })
        .then(event => {
            const idx = event.participants.indexOf(req.params.id)
            if (idx == -1) {
                event.participants.push(req.params.id)
                event.save()
            }
        })
        .then(() => res.json(req.params.id))
        .catch(err => next(err))
})

//leave event

router.put('/leave/:eventId/:id', isLoggedIn, isTheUserAllowed, (req, res, next) => {
    Event
        .findById(req.params.eventId, { participants: 1 })
        .then(event => {
            const idx = event.participants.indexOf(req.params.id)
            if (idx >= 0) {
                event.participants.splice(idx, 1)
                event.save()
            }
        })
        .then(() => res.json(req.params.id))
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
        .find({ owner: req.params.userId })
        .then(response => res.json(response))
        .catch(err => next(err))
})

// get all events of a user
router.get('/:userId/all', (req, res, next) => {
    Event
        .find()
        .then(response => res.json(response.filter(event => event.participants.includes(req.params.userId))))
        .catch(err => next(err))
})


// get events where user is participant
router.get('/:userId/participant', (req, res, next) => {
    Event
        .find()
        .then(response => {
            res.json(response.filter(event =>
                event.participants.includes(req.params.userId)
                && event.owner != req.params.userId))
        })
        .catch(err => next(err))
})

//Create event

router.post('/create/:id', isLoggedIn, isTheUserAllowed, (req, res, next) => {
    console.log(req.isAuthenticated(), "esta es la sesion")
    isFormValidated(req.body, res)
        .then(validated => validated &&
            Event
                .create(req.body)
                .then(() => res.json(''))
                .catch(err => next(err)))
        .catch(err => next(err))
    
    

})

//delete event
router.delete('/delete/:eventId/:id', isLoggedIn, isTheUserAllowed, (req, res, next) => {

    Event
        .findByIdAndRemove(req.params.eventId)
        .then(() => res.json(''))
        .catch(err => next(err))

})

//get one event
router.get('/event/:userId', (req, res, next) => {

    Event
        .findById(req.params.userId)
        .populate({
            path:'acceptedOffer',
            populate:{
                path:"local",
                populate: 'owner'
            }
        })
        .then(response => res.json(response))
        .catch(err => next(err))

})
//get event by name
router.get('/event/name/:eventName', (req, res, next) => {
    Event
        .findOne({ name: req.params.eventName })
        .then(response => res.json(response))
        .catch(err => next(err))  
})

//update event
router.put('/event/:eventId/:id', isLoggedIn, isTheUserAllowed, (req, res, next) => {
    isFormValidated(req.body, res)
        .then(validated => validated && 
            Event
                .findByIdAndUpdate(req.params.eventId, req.body, { new: true })
                .then(response => res.json(response))
                .catch(err => next(err))       
        )
        .catch(err => next(err))
})

// add offer to an event
router.put('/:eventId/offer/add/:offerId',isLoggedIn, (req, res, next) => {

    Event
        .findById(req.params.eventId)
        .then(event => {
            event.offers.push(req.params.offerId)
            event.save()
        })
        .then(response => res.json(response))
        .catch(err => next(err))

})

//get all events of a person

router.get('/:userId', (req, res, next) => {
    Event
        .find({ owner: req.params.userId })
        .then(response => res.json(response))
        .catch(err => next(err))

})


module.exports = router