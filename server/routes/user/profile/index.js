const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10

//Models
const User = require('../../../models/user.model')
const Person = require('../../../models/person.model')
const Company = require('../../../models/company.model')

//Helper functions 

const obtainDetailsUpdate = body => {
    const elementToChange = { ...body }
    delete elementToChange.username
    delete elementToChange.password
    return elementToChange
}

const updateDetails = (id, body, model) => {
    model.findByIdAndUpdate(id, obtainDetailsUpdate(body), { new: true })
        .then(response => response)
        .catch(err => console.log(err))
}

//Endpoints

// get Persondetails

router.get('/personDetails/:id', (req, res, next) => {

    Person
        .findById(req.params.id)
        .then(personDet => res.json(personDet))
        .catch(error => console.log(error))
})

//edit username and password

router.post('/edit/:id', (req, res, next) => {
  
    const {username, password, } = req.body
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



module.exports = router