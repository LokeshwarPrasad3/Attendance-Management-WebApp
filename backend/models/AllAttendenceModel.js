
const mongoose = require('mongoose');

const allAttedenceSchema = new mongoose.Schema({
    date: {
        type: String,
        require: true,
    },
    day: {
        type: String,
        require: true
    },
    sem: {
        type: Number,
        require: true,
    },
    branch: {
        type: String,
        require: true,
    },
    subject: {
        type: String,
        require: true,
    },
    total: {
        type: Number,
        require: true,
    }
}, {
    timestamps: true
})

const allAttedenceModel = new mongoose.model("allAttendenceModel", allAttedenceSchema);

module.exports = { allAttedenceModel };