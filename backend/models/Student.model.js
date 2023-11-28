const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define a schema for the 'Student' collection.
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mono: { type: Number },
    pic: {
        type: String,
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
    branch: {
        type: String,
        required: true,
    },
    college: {
        type: String,
        default: "RSR Rungta College of Engineering & Technology Bhilai" // Default college name
    },
    password: {
        type: String,
        require: true,
    },
    token: { type: String },
    attendence: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AttendenceModel', // Reference to the 'Attendence' model
    },
    type: { type: String, default: "student" },
},
    {
        timestamps: true // Automatically add createdAt and updatedAt fields
    });


// before save user details we need to make hash and then store
studentSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        // directly changed to password
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})

// check password match during login
studentSchema.methods.matchPassword = async function (enteredPassword) {
    // console.log("actual pass ", this.password);
    return bcrypt.compare(enteredPassword, this.password);
    // very important parameter of compare
}


// Create a Mongoose model for 'Student'.
const StudentModel = new mongoose.model("StudentModel", studentSchema);

module.exports = StudentModel ;
