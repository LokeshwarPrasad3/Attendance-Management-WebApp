
export const session_start_date = "4/12/2023";

export const getSundayNumbers = () => {
    let sundayCount = 0;
    let totalDays = 0;
    let startDate = new Date(2023, 11-1, 4);
    const date = new Date();
    const currDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    while (startDate < currDate) {
        if (startDate.getDay() === 0) {
            sundayCount = sundayCount + 1;
        }
        // count how many days in duration
        totalDays = totalDays + 1;
        // increase date
        startDate.setDate(startDate.getDate() + 1);
    }
    const totalClassDays = totalDays - sundayCount;
    return {sundayCount, totalDays, totalClassDays}
    
}
