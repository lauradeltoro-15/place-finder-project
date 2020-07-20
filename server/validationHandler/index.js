class ValidationHandler {

    areRequiredFieldsFilled = (body, res, ...fields) => {
        console.log(body)
        if (!fields.every(field => body[field] && body[field].length > 0 || body[field] > 0 )) {
            res.status(400).json({ message: `The following fields are required: ${fields.join(', ')}.` })
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
        if (field.length > length) {
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
    isFutureDate = (date, res) => {
        const today = new Date()
        const formDate = new Date(date)
        if (formDate < today) {
            res.status(400).json({ message: `The date selected should be a future date.` })
            return false
        }
        return true
    }

}

module.exports = ValidationHandler