const mongoose = require('mongoose');

const attendenceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'studentModel'
    },
    studentName : {type:String},
    all_attendence: [
        {
            subject:{
                type: String,
            },
            date: {
                type: Date,
            },
            day: {
                type: String,
            },
            status: {
                type: Boolean,
                default: false,
            }
        }
    ]
}, {
    timestamps: true
});

const AttendenceModel = new mongoose.model("AttendenceModel", attendenceSchema)

module.exports = { AttendenceModel }