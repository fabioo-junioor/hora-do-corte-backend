import connect from '../database/connect.js';

const getScheduleModel = async (pkProfessional) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.query('SELECT * FROM `professionalSchedules` WHERE `fkProfessional` = ?',
            [ pkProfessional ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};
const createScheduleModel = async (schedules, dateTimeRegistration, pkProfessional) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('INSERT INTO `professionalSchedules` (`schedules`, `dateTimeRegistration`, `fkProfessional`) VALUES (?, ?, ?)',
            [ schedules, dateTimeRegistration, pkProfessional ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};
const updateScheduleModel = async (schedules, pkProfessionalSchedule) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('UPDATE `professionalSchedules` SET `schedules` = ? WHERE `pkProfessionalSchedules` = ?',
            [ schedules, pkProfessionalSchedule ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};


export {
    getScheduleModel,
    createScheduleModel,
    updateScheduleModel

};