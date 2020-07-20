const express = require('express')
const router = express.Router()

router.use('/profile', require("./profile"))
router.use('/event', require("./event"))


module.exports = router