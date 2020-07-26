const mongoose = require("mongoose")
const Schema = mongoose.Schema

const companySchema = new Schema({
    description: {
        type: String,
        maxlength: 500
    },
    contact: {
        phone: {
            value: {
                type: Number
            },
            image: {
                type: String,
                default: "https://res.cloudinary.com/dlsnvevxk/image/upload/v1595763527/avatar/fainder-phone.png.png",
            }
        },
        instagram: {
            value: {
                type: String
            },
            image: {
                type: String,
                default: "https://res.cloudinary.com/dlsnvevxk/image/upload/v1595763469/avatar/fainder-instagram.png.png",
            }
        },
        facebook: {
            value: {
                type: String
            },
            image: {
                type: String,
                default: "https://res.cloudinary.com/dlsnvevxk/image/upload/v1595763497/avatar/fainder-facebook.png.png",
            }
        },
        website: {
            value: {
                type: String
            },
            image: {
                type: String,
                default: "https://res.cloudinary.com/dlsnvevxk/image/upload/v1595763513/avatar/fainder-website.png.png",
            }
        },
    }
}, {
    timestamps: true
})

const Company = mongoose.model("Company", companySchema)

module.exports = Company