const mongoose = require("mongoose")
const Schema = mongoose.Schema

const localSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    pictures: {
        type: [{
            imageUrl: String,
            isMain: {
                type: Boolean,
                default: false,
            }
        }],
        default: "",

    },
    description: {
        type: String,
        maxlength: 500
    },
    location: {
        address: {
            type: String,
            required: true,
            minLength: 8
        },
        coordinates: {
            lat: { type: Number },
            lng: { type: Number }
        },
    },
    capacity: {
        type: Number,
        min: 2
    },
    localType: {
        type: String,
        enum: ["restaurant", "gym", "hotel", "others"],
        required: true
    },
    services: {
        type: [String],
        enum: ["staff", "food-service", "music", "others"]
    },
    facilities: {
        type: [String],
        enum: ["kitchen", "bathrooms", "dinning-hall", "terrace", "garden", "pool", "others"]
    },
    calendar: [Date],
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    owner: { type: Schema.Types.ObjectId, ref: "Company" },
    socialMedia: {
        type: [{
            name: {
                type: String,
                enum: ["Instagram", "Facebook", "Twitter", "Website"]
            },
            mediaUrl: {
                type: String
            }
        }]
    }

}, {
    timestamps: true
})

const Local = mongoose.model("Local", localSchema)

module.exports = Local