const express = require('express')
const router = express.Router()
const passport = require("passport")

const Offer = require ("../../models/offer.model")
const Local = require("../../models/local.model")
const ValidationHandler = require("../../validationHandler")
const validationHandler = new ValidationHandler()

//Helper functions
const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : null

const isTheUserAllowed = (req, res, next) => req.user.id === req.params.id ? next() : null

const deleteLocal = (req, res, next) => {
    return Local.findByIdAndDelete(req.params.localId)
        .then(() => Offer.deleteMany({ local: req.params.localId }))
        .then(deleteDetails => res.json(deleteDetails))
        .catch(err => next(err))
}
    
const handleErrors = (err, req, res, next) => res.status(500).json({ message: "Oops, something went wrong..." })

const isAnyAcceptedOfferFuture = offers => offers.some(offer => offer.event.startTime > new Date())

const mapLocal = (local, companyId) => {
    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const mapAvailability = weekDays.filter(day => local.availability[day].available).map((day,i) => {
        return {
            daysOfWeek: [weekDays.indexOf(day) + 1],
            startTime: local.availability[day].startTime,
            endTime: local.availability[day].endTime,
        }
    })
    return {
        ...local,
        availability: mapAvailability,
        owner: companyId
    }
}

const isFormValidated = (local, res) => {
    return validationHandler.areRequiredFieldsFilled(local, res, "name", "location", "capacity", "localType") &&
    validationHandler.isFieldLongEnough(local.name, res, 2, "name") &&
    validationHandler.isFieldTooLong(local.description, res, 500, "description") &&
    validationHandler.isFieldValueTooSmall(Number(local.capacity), res, 10, "capacity") &&
    validationHandler.isLocationSelected(local.location, res)
}

//Routes
router.delete("/delete/:localId/:id", isLoggedIn, isTheUserAllowed, (req, res, next) => {
    Offer.find({ status: "accepted", local: req.params.localId })
    .populate("event")
        .then(offers => offers.length > 0 && isAnyAcceptedOfferFuture(offers))
        .then(hasAcceptedOffers => hasAcceptedOffers ? res.status(400).json({ message: "You cannot delete a local that has pending events" }) : deleteLocal(req, res, next)
        
    )
})

router.put("/edit/:localId/:id", isLoggedIn, isTheUserAllowed, (req, res, next) => {
    isFormValidated(req.body.updatedLocal, res) &&
    Local.findByIdAndUpdate(req.params.localId, mapLocal(req.body.updatedLocal, req.body.id), {new:true})
        .then(localUpdated => res.json(localUpdated))
        .catch(err => next(err))
})

router.get("/details/:localId", (req, res, next) => {
    Local.findById(req.params.localId)
        .populate("owner")
        .then(local => res.json(local))
        .catch(err => next(err))
})

router.post('/add/:id',, isLoggedIn, isTheUserAllowed, (req, res, next) => {  
    isFormValidated(req.body.newLocal, res) &&
    Local.create(mapLocal(req.body.newLocal, req.body.id))
        .then(newLocal => res.json(newLocal))
        .catch(err => next(err))
})

router.get('/:userId', (req,res,next) => {
    Local.find({ owner: req.params.userId })
        .then(locals => res.json(locals))
        .catch(err => next(err))
})

router.use(handleErrors)

module.exports = router


