const mongoose = require("mongoose")
const Schema = mongoose.Schema

const personSchema = new Schema({
    age: {
        type: Number,
        min: 0
    },
    genre: {
        type: String,
        enum: ['Male', 'Female']
    },
    interests: {
        type: [String],
        enum: ["sport", "music", "learning"]
    },
    calendar: [Date],
    favouriteLocals: [{ type: Schema.Types.ObjectId, ref: "Event" }]
}, {
    timestamps: true
})

const Person = mongoose.model("Person", personSchema)

module.exports = Person