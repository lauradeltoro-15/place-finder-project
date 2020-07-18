const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10

//Models
const User = require('../../../models/user.model')
const Person = require('../../../models/person.model')


//Endpoints

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

    // User
    //     .findByIdAndUpdate(req.params.id, {username, password: hashPass})
    //     .then(user => Person.findById(user.personDetails))
    //     .then((person) => {
    //         person.interests.push('learning')
    //         person.save()
    //     })
    //     .catch(err => console.log(err))

        User
        .findById(req.params.id)
        .populate('personDetails')
        .then((user) => {
            user.username = username
            user.password = hashPass
            user.save()
            return user.personDetails
        })
        .then((personDetails) => {
            personDetails.interests.push('asdasd')
            personDetails.save()
        })
        .catch(err => next(new Error(err)))
    // User
    //     .findByIdAndUpdate(req.params.id, {username, password: hashPass, avatar, interests})
    //     .then((response) => res.json(response))
    //     .catch(err => next(new Error(err)))
})



module.exports = router