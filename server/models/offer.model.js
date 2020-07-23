const mongoose = require("mongoose")
const Schema = mongoose.Schema

const offerSchema = new Schema({
    price: {
        type: Number,
        required: true
    },
    local: { type: Schema.Types.ObjectId, ref: "Local", required: true},
    event: {type: Schema.Types.ObjectId, ref: "Event", required: true},
    description: {
        type: String
    },
    isAccepted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Offer = mongoose.model("Offer", offerSchema)

module.exports = Offer