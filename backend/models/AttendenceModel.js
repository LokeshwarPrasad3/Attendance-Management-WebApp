const mongoose = require('mongoose');

const attendenceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    all_attendence: [
        { date: Date, day: String, status: Boolean },
    ]
}, {
    timestamps: true
});

const AttendenceModel = new mongoose.model("attendenceModel", AttendenceSchema)

module.exports = { AttendenceModel }