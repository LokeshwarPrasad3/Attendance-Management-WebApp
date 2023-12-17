import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'studentModel'
    },
    studentName: { type: String, require: true },
    sem: { type: Number, require: true },
    present: { type: Number },
    branch: { type: String, require: true },
    all_attendence: [
        {
            subject: {
                type: String,
                require: true,
            },
            date: {
                type: String,
                require: true,
            },
            day: {
                type: String,
                require: true,
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

const AttendanceModel = new mongoose.model("AttendanceModel", attendanceSchema)

export default AttendanceModel;