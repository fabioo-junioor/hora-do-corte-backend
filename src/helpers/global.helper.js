const getTimeZone = () => {
    const now = new Date();
    const options = { timeZone: 'America/Sao_Paulo', hour12: false };
    const formatter = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'

    });
    const parts = formatter.formatToParts(now);
    const dateTimeString = `${parts[4].value}-${parts[2].value}-${parts[0].value} ${parts[6].value}:${parts[8].value}:${parts[10].value}`;
    return dateTimeString;

};

export {
    getTimeZone,

};