const buyPlan = (dateBuy, time) => {
    const partsDate = dateBuy.split('-');
    const day = parseInt(partsDate[0], 10);
    const month = parseInt(partsDate[1], 10) - 1;
    const year = parseInt(partsDate[2], 10);

    const date = new Date(year, month, day);

    date.setDate(date.getDate() + parseInt(time, 10));

    const validityDay = String(date.getDate()).padStart(2, '0');
    const validityMonth = String(date.getMonth() + 1).padStart(2, '0');
    const validityYear = date.getFullYear();

    return `${validityDay}-${validityMonth}-${validityYear}`;

};
const checkLastPurchaseValidity = (dateBuy, dateLastBuy, timeBuy, timeLastBuy) => {
    const stringForDateTime = (dateStr, timeStr) => {
        const partsDate = dateStr.split('-');
        const day = parseInt(partsDate[0], 10);
        const month = parseInt(partsDate[1], 10) - 1;
        const year = parseInt(partsDate[2], 10);

        const partsTime = timeStr.split(':');
        const hours = parseInt(partsTime[0], 10);
        const minutes = parseInt(partsTime[1], 10);

        return new Date(year, month, day, hours, minutes);
    };
    const dateBuyObj = stringForDateTime(dateBuy, timeBuy);
    const dateValidityLastBuyObj = stringForDateTime(dateLastBuy, timeLastBuy);

    return dateBuyObj < dateValidityLastBuyObj;
};

export {
    buyPlan,
    checkLastPurchaseValidity

};