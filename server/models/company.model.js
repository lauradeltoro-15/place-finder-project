const mongoose = require("mongoose")
const Schema = mongoose.Schema

const companySchema = new Schema({
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