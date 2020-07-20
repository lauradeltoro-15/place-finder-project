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
    Local.findByIdAndDelete(req.params.localId)
        .then(localDeleted => res.json(localDeleted))
        .catch(err => console.log(err))
})

router.put("/edit/:localId", (req, res, next) => {
    Local.findByIdAndUpdate(req.params.localId, mapLocal(req.body.updatedLocal, req.body.id), {new:true})
        .then(localUpdated => res.json(localUpdated))
        .catch(err => console.log(err))
})

router.get("/details/:localId", (req, res, next) => {
    Local.findById(req.params.localId)
        .populate("owner")
        .then(local => res.json(local))
        .catch(err => console.log(err))
})

router.post('/add', (req, res, next) => {   
    Local.create(mapLocal(req.body.newLocal, req.body.id))
        .then(newLocal => res.json(newLocal))
        .catch(err=> console.log(err))
})

router.get('/:userId', (req,res,next) => {
    Local.find({ owner: req.params.userId })
        .then(locals => res.json(locals))
        .catch(err => console.log(err))
})


module.exports = router
