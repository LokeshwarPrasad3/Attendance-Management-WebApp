const mongoose = require('mongoose');

const hodSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: { type: String },
    pic : {
        type : String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },

})