const mongoose = require("mongoose")
const Schema = mongoose.Schema

const offerSchema = new Schema({
    price: {
        type: Number,
        required: true
    },
    local: { type: Schema.Types.ObjectId, ref: "Local", required: true},
    calendar: {
        type: [Date]
    },
    city: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

const Offer = mongoose.model("Offer", offerSchema)

module.exports = Offer