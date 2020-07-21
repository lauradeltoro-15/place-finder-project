const express = require('express')
const router = express.Router()

const Offer = require("../../models/offer.model")
const ValidationHandler = require("../../validationHandler")
const validationHandler = new ValidationHandler()


module.exports = router