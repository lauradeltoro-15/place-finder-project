const express = require('express')
const router = express.Router()

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
router.delete("/delete/:localId", (req, res, next) => {
    console.log("yujuuu")
    Local.findByIdAndDelete(req.params.localId)
        .then(localDeleted => res.json(localDeleted))
        .catch(err => console.log(err))
})
router.post('/add', (req, res, next) => {
    Local.create(mapLocal(req.body.newLocal, req.body.id))
        .then(newLocal => res.json(newLocal))
        .catch(err=> console.log(err))
})
router.get('/:companyId', (req,res,next) => {
    Local.find({owner: req.params.companyId})
        .then(locals => res.json(locals))
        .catch(err => console.log(err))
})


module.exports = router
