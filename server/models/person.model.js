const mongoose = require("mongoose")
const Schema = mongoose.Schema

const personSchema = new Schema({
    interests: {
        type: [String],
        enum: ["sport", "music", "learning"]
    },
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    calendar: [Date],
    favouriteLocals: [{ type: Schema.Types.ObjectId, ref: "Event" }]
}, {
    timestamps: true
})

const Person = mongoose.model("Person", personSchema)

module.exports = Person