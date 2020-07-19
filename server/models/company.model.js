const mongoose = require("mongoose")
const Schema = mongoose.Schema

const companySchema = new Schema({
    description: {
        type: String,
        maxlength: 500
    },
    phone: {
        type: Number,
    },
    location: {
        address: {
            type: String,
            minLength: 8
        },
        coordinates: {
            lat: { type: Number },
            lng: { type: Number }
        },
    },
    socialMedia: {
        type: [{
            name: {
                type: String,
                enum: ["instagram", "facebook", "website"]
            },
            mediaUrl: {
                type: String
            }
        }]
    },
    local: [{ type: Schema.Types.ObjectId, ref: "Local" }]
}, {
    timestamps: true
})

const Company = mongoose.model("Company", companySchema)

module.exports = Company