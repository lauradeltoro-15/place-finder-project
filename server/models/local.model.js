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
    // pictures: {
    //     type: [{
    //         imageUrl: String,
    //         isMain: {
    //             type: Boolean,
    //             default: false,
    //         }
    //     }],
    //     default: ""
    // },
    availableHours: [ // specify an array instead
        {
            daysOfWeek: {
                type: [Number],
                enum: [1, 2, 3, 4, 5, 6, 7]
            }, 
            startTime: {
                type: String,
                match: / ^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
            },
            startTime: {
                type: String,
                match: / ^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
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
            minLength: 8
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
        enum: ["kitchen", "bathrooms", "dinning-hall", "terrace", "garden", "pool", "others"]
    },
    calendar: [Date],
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }],

}, {
    timestamps: true
})

const Local = mongoose.model("Local", localSchema)

module.exports = Local