
const mongoose = require('mongoose');

const allAttendanceSchema = new mongoose.Schema({
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

const AllAttendanceModel = new mongoose.model("AllAttendanceModel", allAttendanceSchema);

module.exports = AllAttendanceModel ;