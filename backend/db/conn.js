// Database Connection Setup
const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;

const connectToDB = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to the MongoDB database.");
    } catch (error) {
        console.log(`Failed to connect to the database: ${error}`);
    }
}

connectToDB();
module.exports = { connectToDB };
