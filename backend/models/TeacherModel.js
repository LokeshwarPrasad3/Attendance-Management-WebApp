
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: { type: String },
    specilization: { type: String },
    pic: {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    teach: [
        {
            sem: Number,
            branch: String,
        }
    ]
});

const TeacherModel = new mongoose.model("TeacherModel", teacherSchema);

module.exports = { TeacherModel };