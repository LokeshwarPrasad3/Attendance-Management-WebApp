
import { app } from './app.js'

// initialized secret variables file .env
import dotenv from "dotenv"

// .env variables for localhost
// dotenv.config({ path: '.env.local' });

// .env variables for production
dotenv.config({ path: ".env.production" });

// getting PORT no from secret .env file
const PORT = process.env.PORT || 5000;

// connection established
import connectToDB from "./db/conn.js";

connectToDB().
    then(() => {
        app.on("error", () => {
            console.log("Error on app", error)
            throw error;
        })
        app.listen(PORT, () => {
            console.log(`Server is running at PORT ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(`Mongodb connection failed ${error}`)
    })
