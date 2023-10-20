const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const hodSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: { type: String, require: true },
    branch: { type: String, require: true },
    password: { type: String, require: true },
    pic: {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    token: { type: String },
    type: { type: String, default: "hod" },
})

// when we craete user then automaticaly create hash and saved it
hodSchema.pre('save', async function (next) {
    // if user profile  modified then change password hash
    if (this.isModified('password')) {
        // crate hash
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})

// check password entered rigt or not
hodSchema.methods.matchPassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
}

const HodModel = mongoose.model("HodModel", hodSchema);

module.exports = HodModel