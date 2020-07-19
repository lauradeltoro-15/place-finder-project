const express = require('express')
const router = express.Router()

router.use('/profile', require("./profile"))


module.exports = router