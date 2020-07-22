const express = require('express')
const router = express.Router()
const passport = require("passport")

const Local = require("../../models/local.model")
const ValidationHandler = require("../../validationHandler")
const validationHandler = new ValidationHandler()
//Helper functions
const mapLocal = (local, companyId) => {
    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const mapAvailability = weekDays.filter(day => local.availability[day].available).map((day,i) => {
        return {
            daysOfWeek: [weekDays.indexOf(day) + 1],
            startTime: local.availability[day].startTime,
            endTime: local.availability[day].endTime,
        }
    })
    console.log(mapAvailability, "map availability", local, "local")
    return {
        ...local,
        location: {
            address: local.location,
            
        },
        availability: mapAvailability,
        owner: companyId
    }
}

const isFormValidated = (local, res) => {
    return validationHandler.areRequiredFieldsFilled(local, res, "name", "location", "capacity", "localType") &&
    validationHandler.isFieldLongEnough(local.name, res, 2, "name") &&
    validationHandler.isFieldTooLong(local.description, res, 500, "description") &&
    validationHandler.isFieldValueTooSmall(Number(local.capacity), res, 10, "capacity")
}

//Routes
router.delete("/delete/:localId", (req, res, next) => {
    console.log(req.isAuthenticated(), "authenticate")
    console.log(req.user, "user")

    Local.findByIdAndDelete(req.params.localId)
        .then(localDeleted => res.json(localDeleted))
        .catch(err => console.log(err))
})

router.put("/edit/:localId", (req, res, next) => {
    isFormValidated(req.body.updatedLocal, res) &&
    Local.findByIdAndUpdate(req.params.localId, mapLocal(req.body.updatedLocal, req.body.id), {new:true})
        .then(localUpdated => res.json(localUpdated))
        .catch(err => console.log(err))
})

router.get("/details/:localId", (req, res, next) => {
    Local.findById(req.params.localId)
        .populate("owner")
        .then(local => res.json(local))
        .catch(err => console.log(err))
})

router.post('/add', (req, res, next) => {  
    console.log("este es el local", req.body)
    isFormValidated(req.body.newLocal, res) &&
    Local.create(mapLocal(req.body.newLocal, req.body.id))
        .then(newLocal => res.json(newLocal))
        .catch(err=> console.log(err))
})

router.get('/:userId', (req,res,next) => {
    Local.find({ owner: req.params.userId })
        .then(locals => res.json(locals))
        .catch(err => console.log(err))
})


module.exports = router
