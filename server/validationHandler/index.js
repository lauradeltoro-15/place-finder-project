class ValidationHandler {

    areRequiredFieldsFilled = (body, res, ...fields) => {
        const pendingFields = fields.filter(field => !body[field] && body[field].length == 0 || body[field] == 0)
        if (pendingFields.length > 0) {
            res.status(400).json({ message: `The following fields are required: ${pendingFields.join(', ')}.` })
            return false
        }
        return true
    }

    isFieldLongEnough = (field, res, length, fieldName) => {
        if (field.length < length) {
            res.status(400).json({ message: `The ${fieldName} should be at least ${length} characters long.` })
            return false
        }
        return true
    }
    isFieldTooLong = (field, res, length, fieldName) => {
        if (field && field.length >= length) {
            res.status(400).json({ message: `The ${fieldName} can only have ${length} characters.` })
            return false
        }
        return true
    }
    isFieldValueTooSmall = (field, res, value, fieldName) => {
        if (field < value) {
            res.status(400).json({ message: `The ${fieldName} should have at least a value of ${value}.` })
            return false
        }
        return true
    }
    isFutureDate = (present, date, res) => {
        const formDate = new Date(date)
        if (formDate < present) {
            res.status(400).json({ message: `The date selected should be a future date.` })
            return false
        }
        return true
    }
    isNameUnique = (model, name, res, eventId) => {
        return model.findOne({ name })
            .then(response => {
                if (response && response._id != eventId) {
                    res.status(400).json({ message: `The name you choose is already taken.` })
                    return false
                }
                return true
            })
            .catch(err => console.log(err))
    }
    isLocationSelected = (location, res) => {
        if (location.address.length === 0 || location.coordinates.lat.length === 0 || location.coordinates.lng.length === 0) {
            res.status(400).json({ message: `Select a valid address.` })
            return false
        }
        return true
    }

}

module.exports = ValidationHandler