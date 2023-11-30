

export const greetMessage = () => {
    const Hour = new Date().getHours()
    if (Hour >= 0 && Hour < 12) {
        return "Hey, Good Morning😃";
    }
    else if (Hour >= 12 && Hour < 17) {
        return "Hey, Good Afternoon😃";
    }
    else if (Hour <= 17 && Hour < 20) {
        return "Hey, Good Evening😃";
    }
    return "Hey, Good Night😃";
}