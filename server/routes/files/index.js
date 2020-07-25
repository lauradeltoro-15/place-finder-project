const express = require('express');
const router = express.Router();

const uploader = require('../../configs/cloudinary.config');
const handleErrors = (err, req, res, next) => res.status(500).json({ message: "Oops, something went wrong..." })

router.post('/upload', uploader.single("avatar"), (req, res, next) => {

    if (!req.file) {
        next(new Error('No file uploaded!'));
        return;
    }
    res.json({ secure_url: req.file.secure_url });
})

router.use(handleErrors)


module.exports = router;