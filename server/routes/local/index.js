const express = require('express')
const router = express.Router()

const Company = require('../../models/company.model')
const Local = require("../../models/local.model")


//Helper functions
const mapLocal = (local,companyId) => {
    return {
        ...local,
        location: {
            address: local.location
        },
        owner: companyId
    }
}

//Routes
router.post('/add', (req, res, next) => {
    console.log(mapLocal(req.body.newLocal))
    Local.create(mapLocal(req.body.newLocal, req.body.id))
        .then(newLocal => res.json(newLocal))
        .catch(err=> console.log(err))
})

module.exports = router
