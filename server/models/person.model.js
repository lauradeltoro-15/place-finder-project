const mongoose = require("mongoose")
const Schema = mongoose.Schema

const personSchema = new Schema({
    age: {
        type: Number,
        min: 16
    },
    genre: {
        type: String,
        enum: ['Male', 'Female']
    },
    interests: {
        type: [String],
        enum: ["sport", "music", "learning", 'technology', 'health and wellness', 'kids', 'adults', 'photography', 'art', 'food', 'languajes', 'culture', 'cinema', 'games', 'fashion', 'dance', 'bussiness'],
        minlength: 1,
    },
    calendar: [Date],

    favouriteLocals: [{ type: Schema.Types.ObjectId, ref: "Local" }],

}, {
    timestamps: true
})

const Person = mongoose.model("Person", personSchema)

module.exports = Person