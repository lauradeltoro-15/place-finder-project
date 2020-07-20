const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10

//Models
const User = require('../../../models/user.model')
const Person = require('../../../models/person.model')
const Company = require('../../../models/company.model')

//Helper functions 
const obtainDetailsUpdate = (body,model) => {
    const elementToChange = { ...body }
    delete elementToChange.username
    delete elementToChange.password
    return model == Person ? elementToChange : mapCompany(elementToChange)
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
        .then(response => console.log(response))
        .catch(err => console.log(err))
}

//Endpoints
//edit username and password
router.post('/edit/:id', (req, res, next) => {
    const {username, password } = req.body
    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)

    if (!username || !password) {
        res.json({ message: "Please, introduce a valid username and password"})
        return
    }

    User
        .findByIdAndUpdate(req.params.id, {username, password: hashPass}, { new: true })
        .then(user => user.companyDetails ? { user, model: Company, id: user.companyDetails } : {user, model: Person, id: user.personDetails })
        .then(details => {
            updateDetails(details.id, req.body, details.model)
            return details.user
        })
        .then(user => res.json(user))
        .catch(err => console.log(err))
})

// get user details
router.get('/:id', (req, res, next) => {
    console.log("Request to return details received")
    User
        .findById(req.params.id)
        .populate("companyDetails")
        .populate("personDetails")
        .then(user => res.json(user))
        .catch(error => console.log(error))
})


module.exports = router