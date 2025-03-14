const getTimeZone = () => {
    const newDate = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    return newDate;

};

export {
    getTimeZone,

};