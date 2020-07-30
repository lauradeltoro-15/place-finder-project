const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10
const passport = require("passport")  

//Models
const User = require('../../../models/user.model')
const Person = require('../../../models/person.model')
const Company = require('../../../models/company.model')

const ValidationHandler = require("../../../validationHandler")
const validationHandler = new ValidationHandler()

//Helper functions 

const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : null
const isTheUserAllowed = (req, res, next) => req.user.id === req.params.id ? next() : null
const handleErrors = (err, req, res, next) => res.status(500).json({ message: "Oops, something went wrong... try it later :" })

const obtainDetailsUpdate = (body,model) => {
    const elementToChange = { ...body }
    delete elementToChange.username
    delete elementToChange.password
    return model == Person ? elementToChange : mapCompany(elementToChange)
}

const isUserFormValid = (model, body, res) => {
    if (model == Person && !validationHandler.areRequiredFieldsFilled(body, res, "interests")) {
        return false 
    }
    if (model == Company && !validationHandler.isFieldTooLong(body.description, res, 500, "description")) {
        return false
    }
    return true
}
const mapCompany = (modelData) => {
    const map =  {
        description: modelData.description || null,
        contact: {
            phone: { value: parseInt(modelData.phone) || null },
            instagram: { value: modelData.instagram || null },
            facebook: { value: modelData.facebook || null },
            website: { value: modelData.website || null }
        }
    }
    return map
}

const updateDetails = (id, body, model, next) => {
    model.findByIdAndUpdate(id, obtainDetailsUpdate(body, model), { new: true })
        .then(response => response)
        .catch(err => console.log("este es el error", err))
}

//Endpoints
//edit username and password
router.put('/edit/:id', isLoggedIn, isTheUserAllowed, (req, res, next) => {
    const { username, password, avatar } = req.body    
    User
        .findById(req.params.id)
        .then(user => {
            user.username = username
            avatar !== null ? user.avatar =  avatar : null
            if(password !== ""){
                const salt = bcrypt.genSaltSync(bcryptSalt)
                user.password = bcrypt.hashSync(password, salt)
            }
            console.log(user)
            user.save()
            return user
        }) 
        .then(user => user.companyDetails ? { user, model: Company, id: user.companyDetails } : {user, model: Person, id: user.personDetails })
        .then(details => {
            console.log(details)
            if (isUserFormValid(details.model, req.body, res)) {
                updateDetails(details.id, req.body, details.model, next)
                return details.user
            }
        })
        .then(user => res.json(user))
        .catch(err => next(err))
})

// get user details
router.get('/:id', (req, res, next) => {
    User
        .findById(req.params.id)
        .populate("companyDetails")
        .populate("personDetails")
        .then(user => res.json(user))
        .catch(err => next(err))
})

router.use(handleErrors)

module.exports = router