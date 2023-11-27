

const getTodayFormattedDate = () =>{
    const fullDate = new Date();
    const date = fullDate.getDate();
    const month = fullDate.getMonth() + 1;
    const year = fullDate.getFullYear();
    const formattedDate = date + "/" + month + "/" + year;
    return formattedDate;
}

export {getTodayFormattedDate}