const mongoose = require("mongoose")
const Schema = mongoose.Schema

const localSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    pictures: String,
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/dlsnvevxk/image/upload/v1595677113/avatar/local-icon.png.png'
    },
    availability: [
        {
            daysOfWeek: {
                type: [Number],
                enum: [1, 2, 3, 4, 5, 6, 7]
            }, 
            startTime: {
                type: String,
                match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
            },
            endTime: {
                type: String,
                match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
            }     
        },
    ],
    description: {
        type: String,
        maxlength: 500
    },
    location: {
        address: {
            type: String,
            required: true,
        },
        coordinates: {
            lat: { type: Number },
            lng: { type: Number }
        },
    },
    capacity: {
        type: Number,
        min: 10
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
        enum: ["kitchen", "bathrooms", "dinning-hall", "terrace", "garden", "pool", 'audio equipment', 'sport equipment', 'conference room', 'dance floor', 'stage', 'pit', 'video equipment', "others"]
    },
    calendar: [Date],
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }],

}, {
    timestamps: true
})

const Local = mongoose.model("Local", localSchema)

module.exports = Local