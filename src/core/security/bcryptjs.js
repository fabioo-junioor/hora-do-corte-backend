import bcryptjs from 'bcryptjs';

const encryptPass = async (pass) => {
    try {
        const hash = await bcryptjs.hash(pass, 10);
        return hash;

    } catch(error) {
        return null;

    };
};
const comparePass = async (pass, hash) => {
    try {
        const validPass = await bcryptjs.compare(pass, hash);
        if(validPass){
            return true;

        };
        return false;

    } catch (error) {
        return null;

    };
};

export {
    encryptPass,
    comparePass

};