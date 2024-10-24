const AppError = require('./appError');
const split = require('./splitTime');
const findChangeForDate = require('./findChangeForDate');
const Appointment = require('../models/appointmentModel');
const Interval = require('../models/defaultIntervalModel');
const Change = require('../models/changesModel');




const intervalIdToDict = async (startDate, endDate) => {
    const data = {};
    const days = {
        "Monday": 1,
        "Tuesday": 2,
        "Wednesday": 3,
        "Thursday": 4,
        "Friday": 5,
        "Saturday": 6,
        "Sunday": 0
    };

    const startMillis = new Date(startDate).getTime();
    const endMillis = new Date(endDate).getTime();

    const interval = await Interval.findOne();
    const daysToWork = new Set(interval['days'].map(day => days[day]));
    const startHour = interval['startHour'];
    const endHour = interval['endHour'];
    const duration = interval['duration'];
    const breakBetweenAppointments = interval['breakBetweenAppointments'];
    
    const changes = await Change.find();
    const appointments = await Appointment.find();
    
    const bookedDates = new Set(appointments.map(appointment => appointment.date.toISOString()));
    
    const datesToWork = new Set();
    for (let tempDateMillis = startMillis; tempDateMillis <= endMillis; tempDateMillis += 86400000) { 
        const tempDate = new Date(tempDateMillis);
        if (daysToWork.has(tempDate.getUTCDay())) {
            datesToWork.add(tempDateMillis); 
        }
    }

    for (const change of changes) {
        const changeStartMillis = new Date(change.startDate).getTime();
        const changeEndMillis = change.endDate ? new Date(change.endDate).getTime() : endMillis;
        const changeDays = new Set(change['days'].map(day => days[day]));

        for (let tempChangeMillis = changeStartMillis; tempChangeMillis <= changeEndMillis; tempChangeMillis += 86400000) {
            const dayOfWeek = new Date(tempChangeMillis).getUTCDay();
            if (changeDays.has(dayOfWeek)) {
                const isWorking = change.working;
                if (isWorking) {
                    datesToWork.add(tempChangeMillis); 
                } else {
                    datesToWork.delete(tempChangeMillis);
                }
            } else {
                datesToWork.delete(tempChangeMillis); 
            }
        }
    }

    const sortedDates = Array.from(datesToWork).sort((a, b) => a - b);

    const changeLookup = {};
    await Promise.all(sortedDates.map(async (dateMillis) => {
        const currentWorkDate = new Date(dateMillis);
        changeLookup[dateMillis] = await findChangeForDate(currentWorkDate);
    }));

    for (const dateMillis of sortedDates) {
        const currentWorkDate = new Date(dateMillis);
        const changeForDate = changeLookup[dateMillis];
    
        let currentStartHour = startHour;
        let currentEndHour = endHour;
        let currentDuration = duration;
        let currentBreak = breakBetweenAppointments;
    
        if (changeForDate) {
            currentStartHour = changeForDate['startHour'];
            currentEndHour = changeForDate['endHour'];
            currentDuration = changeForDate['duration'] || duration;  
            currentBreak = changeForDate['breakBetweenAppointments'] || breakBetweenAppointments; 
        }
    
        const date = split(currentWorkDate, currentStartHour, currentEndHour, currentDuration, currentBreak, bookedDates);
        data[currentWorkDate.toISOString().split("T")[0]] = date;
    }

    return data; 
}


module.exports = intervalIdToDict;