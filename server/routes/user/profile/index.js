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
    if (model == Company && !validationHandler.isFieldLongEnough(body.address, res, 8, "address")) {
        return false
    }  
    return true
}
const mapCompany = (modelData) => {
    return {
        description: modelData.description || null,
        phone: modelData.phone || null,
        location: {
            address: modelData.address || null
        },
        socialMedia: [
            {name: "instagram", mediaUrl: modelData.instagram || null},
            {name: "facebook", mediaUrl: modelData.facebook || null},
            {name: "website", mediaUrl: modelData.website || null}
        ]      
    }
}

const updateDetails = (id, body, model) => {
    model.findByIdAndUpdate(id, obtainDetailsUpdate(body, model), { new: true })
        .then(response => response)
        .catch(err => console.log(err))
}

//Endpoints
//edit username and password
router.put('/edit/:id', isLoggedIn, isTheUserAllowed, (req, res, next) => {
    const { username, password, avatar } = req.body
    console.log('el req body que me llega', req.body)

    User
        .findById(req.params.id)
        .then(user => {
            user.username = username
            user.avatar = avatar
            if(password !== ""){
                const salt = bcrypt.genSaltSync(bcryptSalt)
                user.password = bcrypt.hashSync(password, salt)
            }
            user.save()
            return user
        }) 
        .then(user => user.companyDetails ? { user, model: Company, id: user.companyDetails } : {user, model: Person, id: user.personDetails })
        .then(details => {
            if (isUserFormValid(details.model, req.body, res)) {
                updateDetails(details.id, req.body, details.model)
                return details.user
            }
        })
        .then(user => res.json(user))
        .catch(err => console.log(err))
})

// get user details
router.get('/:id', (req, res, next) => {
    User
        .findById(req.params.id)
        .populate("companyDetails")
        .populate("personDetails")
        .then(user => res.json(user))
        .catch(error => console.log(error))
})

module.exports = router