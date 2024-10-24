const convertMinutesToMS = require('./convertMinutesToMS');


const split = (date, startHour, endHour, duration, breakBetweenAppointments, bookedDatesSet) => {
    const initTime = new Date(date);
    const [hoursI, minutesI] = startHour.split(":").map(Number);
    initTime.setUTCHours(hoursI, minutesI, 0, 0); 
    const finishTime = new Date(date);
    const [hoursF, minutesF] = endHour.split(":").map(Number);
    finishTime.setUTCHours(hoursF, minutesF, 0, 0); 

    const tempHourArray = [];
    const timeBetweenAppointments = duration + breakBetweenAppointments; 

    for (let tempTime = initTime.getTime(); tempTime < finishTime.getTime(); tempTime += convertMinutesToMS(timeBetweenAppointments)) {
        const tempSlotISO = new Date(tempTime).toISOString();

        if (!bookedDatesSet.has(tempSlotISO)) {
            tempHourArray.push(tempSlotISO); 
        }
    }

    return tempHourArray;
};





module.exports = split;