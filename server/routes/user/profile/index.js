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

    // let personId

    User
        .findByIdAndUpdate(req.params.id, {username, password: hashPass})
        .then(user => user.companyDetails ? { model: Company, id: user.companyDetails } : { model: Person, id: user.personDetails })
        .then(details => details.model.findByIdAndUpdate(details.id, obtainDetailsUpdate(req.body), { new: true }))
        .then(finalUserDetails => {
            console.log("user updated", finalUserDetails)
            res.json(finalUserDetails)})
        .catch(err => console.log(err))

})



module.exports = router