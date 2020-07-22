const express = require('express')
const router = express.Router()

const Offer = require("../../models/offer.model")
const ValidationHandler = require("../../validationHandler")
const validationHandler = new ValidationHandler()



//Endpoints

//create

router.post('/create', (req, res, next) => {
    console.log('req.body', req.body)

    Offer
        .create(req.body)
        .then(offer => res.json(offer))
        .catch(err => next(err))

})
module.exports = router