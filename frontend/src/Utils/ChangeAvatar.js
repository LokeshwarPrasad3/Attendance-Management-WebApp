import axios from "axios";

const getAvatarURL = async (filePic) => {
    try {
        // we need data to send on cloudinary api using formData
        const picData = new FormData();

        // FormData JS object used for data format when sending body in HTTP requests,
        // often used in web applications for tasks like file uploads.

        picData.append("file", filePic);
        picData.append("upload_preset", "mern-chat-app");
        picData.append("cloud_name", "mernchatappcloud");
        picData.append("api_key", "488695261785225");
        picData.append("api_secret", "cWM3uWmnthOo0WXWk5-Ajz4cfVQ");


        const { data } = await axios.post('https://api.cloudinary.com/v1_1/mernchatappcloud/image/upload', picData);
        let avatarURL = data.url.toString();
        console.log("Your updated Pic URL is : ", avatarURL);
        // if url starts with http then replace to  https
        if (avatarURL.startsWith("http://")) {
            avatarURL = avatarURL.replace(/^http:\/\//i, "https://");
        }
        // return avatarURL
        const picObj = { status: true, avatarURL: avatarURL };
        return picObj;
    }
    catch (error) {
        console.log("Error during getting image from cloudinary", error);
        return { status: false, avatarURL: "" }
    }
}


export { getAvatarURL }