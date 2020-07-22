class ValidationHandler {

    areRequiredFieldsFilled = (body, res, ...fields) => {
        console.log(body)
        const pendingFields = fields.filter(field => !body[field] && body[field].length == 0 || body[field] == 0)
        if (pendingFields.length > 0) {
            res.status(400).json({ message: `The following fields are required: ${pendingFields.join(', ')}.` })
            return false
        }
        return true
    }

    isFieldLongEnough = (field, res, length, fieldName) => {
        console.log("this is the field",field, "this is the length",length)
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
    isFutureDate = (present, date, res) => {
        const formDate = new Date(date)
        if (formDate < present) {
            res.status(400).json({ message: `The date selected should be a future date.` })
            return false
        }
        return true
    }

}

module.exports = ValidationHandler