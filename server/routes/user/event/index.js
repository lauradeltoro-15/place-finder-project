const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10

//Models
const User = require('../../../models/user.model')
const Person = require('../../../models/person.model')
const Event = require('../../../models/event.model')

//Helper functions 


//Endpoints


//Create event

router.post('/create', (req, res, next) => {

    Event
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => next(err))

})



module.exports = router