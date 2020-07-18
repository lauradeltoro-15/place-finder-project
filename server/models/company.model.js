const mongoose = require("mongoose")
const Schema = mongoose.Schema

const companySchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    avatar: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        maxlength: 500
    },
    local: [{ type: Schema.Types.ObjectId, ref: "Local" }]
}, {
    timestamps: true
})

const Company = mongoose.model("Company", companySchema)

module.exports = Company