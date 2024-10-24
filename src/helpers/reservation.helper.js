const validatorIsReserved = (dataReservations, timeReservation, duration) => {
    let timeStartCurrent = timeReservation;
    let timeEndCurrent = sumTime(timeReservation, duration);
    
    for (const i in dataReservations) {
        if(dataReservations[i].timeReservation == timeStartCurrent){
            return true;

        };
        let timeStartReserved = dataReservations[i].timeReservation;
        let timeEndReserved = sumTime(dataReservations[i].timeReservation, duration);
        if(timeEndCurrent > timeStartReserved && timeEndCurrent < timeEndReserved){
            return true;

        };
    };
    return false;

};
const sumTime = (time, minutesToAdd) => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutesToAdd = parseInt(minutesToAdd, 10);
    let totalMinutes = minutes + totalMinutesToAdd;
    let totalHours = hours + Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;
    totalHours = totalHours % 24;

    return `${String(totalHours).padStart(2, '0')}:${String(totalMinutes).padStart(2, '0')}`;

};

export {
    validatorIsReserved

};