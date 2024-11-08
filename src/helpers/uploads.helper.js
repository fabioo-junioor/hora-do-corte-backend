import multer from 'multer';

const uploadImage = (req, res) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '../assets/user');

        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.jpg';
            console.log('asa', file);
            cb(null, uniqueSuffix);

        }
    });
};

export {
    uploadImage

};