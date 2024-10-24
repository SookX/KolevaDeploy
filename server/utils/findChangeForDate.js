const Change = require('../models/changesModel'); 

const findChangeForDate = async(dateToWork) => {
    const date = new Date(dateToWork);  

    const matchingChange = await Change.findOne({
        startDate: { $lte: date },   
        endDate: { $gte: date }     
    });

    return matchingChange;
}

module.exports = findChangeForDate;