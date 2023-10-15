const mongoose = require('mongoose');

// Define a schema for the 'Student' collection.
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    mono: { type: Number },
    pic: { 
        type: String ,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    course: {
        type: String,
        required: true,
    },
    sem: {
        type: Number,
        required: true,
    },
    college: {
        type: String,
        default: "RSR Rungta College of Engineering & Technology Bhilai" // Default college name
    },
    attendence: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attendence', // Reference to the 'Attendence' model
    }
},
    {
        timestamps: true // Automatically add createdAt and updatedAt fields
    });

// Create a Mongoose model for 'Student'.
const studentModel = new mongoose.model("studentModel", studentSchema);

module.exports = { studentModel };
