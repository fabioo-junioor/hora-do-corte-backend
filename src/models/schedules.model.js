import connect from '../database/connect.js';

const getScheduleModel = async (pkProfessional) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.query('SELECT * FROM `professionalschedules` WHERE `fkProfessional` = ?',
            [ pkProfessional ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};
const createScheduleModel = async (schedules, createdAt, updatedAt, pkProfessional) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('INSERT INTO `professionalschedules` (`schedules`, `createdAt`, `updatedAt`, `fkProfessional`) VALUES (?, ?, ?, ?)',
            [ schedules, createdAt, updatedAt, pkProfessional ]
        );
        return result;
        
    }catch(error){
        return false;
        
    };
};
const updateScheduleModel = async (schedules, updatedAt, pkProfessionalSchedule) => {
    try {
        const conn = await connect();
        const [ result ] = await conn.execute('UPDATE `professionalschedules` SET `schedules` = ?, `updatedAt` = ? WHERE `pkProfessionalSchedules` = ?',
            [ schedules, updatedAt, pkProfessionalSchedule ]
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