const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    avatar: {
        type: String, 
        default: ""
    },
    // companyDetails: { type: Schema.Types.ObjectId, ref: "Company" },
    // userDetails: { type: Schema.Types.ObjectId, ref: "Person" },
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

const User = mongoose.model("User", userSchema)

module.exports = User