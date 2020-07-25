const express = require('express')
const router = express.Router()
const passport = require("passport")

const Offer = require("../../models/offer.model")
const Event = require("../../models/event.model")
const ValidationHandler = require("../../validationHandler")
const validationHandler = new ValidationHandler()

//Helper functions

const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : null
const isTheUserAllowed = (req, res, next) => req.user.id === req.params.id ? next() : null

//Endpoints

//create

router.post('/create/:id', isLoggedIn, isTheUserAllowed, (req, res, next) => {
    const {event, local} = req.body
    Offer.find()
        .then(offers => offers.filter(offer => offer.event == event && offer.local == local).length === 0)
        .then(hasOffer =>  hasOffer && Offer.create(req.body))
        .then(offer => offer && res.json(offer))
        .catch(err => console.log(err))
})

router.get('/getAllLocalOffers/:localId', (req, res, next) => {
    Offer.find({ local: req.params.localId })
        .populate("event")
        .populate("local")
        .then(offers => res.json(offers))
        .catch(err => next(err))   
})

router.get('/getAllEventsOffers/:eventId', (req, res, next) => {
    Offer
        .find({ event: req.params.eventId })
        .populate({ path: 'local',populate: { path: "owner" } })
        .then(offers => res.json(offers))
        .catch(err => next(err))   
})

router.delete('/delete/:offerId/:id', isLoggedIn, isTheUserAllowed, (req, res, next) => {
    Offer
        .findByIdAndDelete(req.params.offerId)
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.put('/accept/:offerId/event/:eventId', (req, res, next) => {

    Offer
        .find({event: req.params.eventId})
        .then(offers => offers.forEach(offer => {
                offer._id == req.params.offerId ? offer.status = "accepted" : offer.status = "rejected"
                offer.save()                
            })
        )
        .then(() =>  Event.findByIdAndUpdate(req.params.eventId, {acceptedOffer: req.params.offerId}, {new: true}))
        .then(response => res.json(response))
        .catch(err => next(err))
})

module.exports = router