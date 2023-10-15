
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    password: { type: String, require: true, },
    token: { type: String },
    teach: [
        {
            sem: Number,
            branch: String,
        }
    ]
});


// ONLY USED IN MODEL NAME
// Before save document first hash their password
teacherSchema.pre('save', async function(next){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    next();
})

// ONLY USED IN CREATED DOCUMENT
// check password is shimilar when login
teacherSchema.methods.matchPassword = function(enteredPassword){
    return bcrypt.compare(enteredPassword, this.password);
}

const TeacherModel = new mongoose.model("TeacherModel", teacherSchema);

module.exports = { TeacherModel };