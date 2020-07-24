const express = require('express')
const router = express.Router()

const Offer = require("../../models/offer.model")
const Event = require("../../models/event.model")
const ValidationHandler = require("../../validationHandler")
const validationHandler = new ValidationHandler()



//Endpoints

//create

router.post('/create', (req, res, next) => {
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

router.delete('/delete/:offerId', (req, res, next) => {
    Offer
        .findByIdAndDelete(req.params.offerId)
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.put('/accept/:offerId/event/:eventId', (req, res, next) => {

    console.log('offerid', req.params.offerId, ' y eventId ', req.params.eventId)
    Offer
        .find({event: req.params.eventId})
        .then(offers => offers.forEach(offer => {
                offer._id == req.params.offerId ? offer.status = "accepted" : offer.status = "rejected"
                offer.save()                
            })
        )
        .then(() =>  Event.findByIdAndUpdate(req.params.eventId, {acceptedOffer: req.params.offerId}, {new: true}))
        .then(response => console.log('el evento actualizado, ' , response))
        .catch(err => next(err))
})

module.exports = router