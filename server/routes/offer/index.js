const express = require('express')
const router = express.Router()

const Offer = require("../../models/offer.model")
const ValidationHandler = require("../../validationHandler")
const validationHandler = new ValidationHandler()



//Endpoints

//create

router.post('/create', (req, res, next) => {
    const{event, local} = req.body
    
    let exists = false

    Offer.find()
        .then(offers => {if (offers.filter(offer => offer.event == event && offer.local == local).length) exists = true})
        .then(() => {if(!exists) return Offer.create(req.body)})
        .then(offer => {if(offer) res.json(offer)})
        .catch(err => next(err))
})

router.get('/getAllLocalOffers/:localId', (req, res, next) => {
    Offer.find({ local: req.params.localId })
        .populate("event")
        .populate("local")
        .then(offers => res.json(offers))
        .catch(err => next(err))   
})

router.get('/getAllEventsOffers/:eventId', (req, res, next) => {
    Offer.find({ event: req.params.eventId })
        .populate({ path: 'local',populate: { path: "owner" } })
        .then(offers => res.json(offers))
        .catch(err => next(err))   
})
module.exports = router