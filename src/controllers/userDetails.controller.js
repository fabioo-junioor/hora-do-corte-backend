import { getUserDetailsBySlugModel, getUserDetailsByFkModel,
    createUserDetailsModel, updateUserDetailsModel } from '../models/userDetails.model.js';

const dateToday = new Date();

const getUserDetailsController = async (req, res) => {
    try {
        const slug = req.params.slug;
       
        const dataUserDetailsBySlug = await getUserDetailsBySlugModel(slug);
        if(dataUserDetailsBySlug.length === 0){
            return res.status(500).json({
                statusCode: 500,
                message: 'O usuário não existe!'
                
            });
        };        
        return res.status(500).json({
            statusCode: 500,
            message: 'Dados do usuário!',
            data: dataUserDetailsBySlug

        });
    }catch(error){
        res.status(500).json({
            statusCode: 500,
            message: 'Error ao criar o registro!'

        });
    };
};
const createUserDetailsController = async (req, res) => {
    try {
        const { name, slug, phone, instagram, image, state, city, street, number, pkUser } = req.body;
        
        const dataUserDetailsByFk = await getUserDetailsByFkModel(pkUser);
        if(dataUserDetailsByFk.length !== 0){
            return res.status(500).json({
                statusCode: 500,
                message: 'Dados do usuário já existe!'
                
            });
        };
        
        const dataUserDetailsBySlug = await getUserDetailsBySlugModel(slug);
        if(dataUserDetailsBySlug.length !== 0){
            return res.status(500).json({
                statusCode: 500,
                message: 'O nome de usuário já existe!'
                
            });
        };
        
        const dataUserDetails = await createUserDetailsModel(name, slug, phone, instagram, image, state, city, street, number, dateToday, pkUser);
        if(dataUserDetails.affectedRows !== 0){
            return res.status(500).json({
                statusCode: 500,
                message: 'Dados salvos!'

            });
        };
    }catch(error){
        res.status(500).json({
            statusCode: 500,
            message: 'Error ao criar o registro!'

        });
    };
};
const updateUserDetailsController = async (req, res) => {
    try {
        const pkUser = req.params.pk;
        const { name, slug, phone, instagram, image, state, city, street, number } = req.body;
        
        const dataUserDetailsBySlug = await getUserDetailsBySlugModel(slug);
        if((dataUserDetailsBySlug.length !== 0) && (dataUserDetailsBySlug[0]?.fkUser != pkUser)){
            return res.status(500).json({
                statusCode: 500,
                message: 'O nome de usuário já existe!'
                
            });
        };
        
        const dataUserDetails = await updateUserDetailsModel(name, slug, phone, instagram, image, state, city, street, number, pkUser);
        if(dataUserDetails.affectedRows !== 0){
            return res.status(500).json({
                statusCode: 500,
                message: 'Dados salvos!'
    
            });
        };
    }catch(error){
        res.status(500).json({
            statusCode: 500,
            message: 'Error ao criar o registro!'

        });
    };
};
/*
const uploadImage = (req, res) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '../assets/user');

        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.jpg';
            cb(null, uniqueSuffix);

        }
    });
    const upload = multer({ storage }).single('file');
    upload(req, res, (err) => {
        if(err instanceof multer.MulterError){
            return false;

        };
        if(err){
            return false;

        };
        
        return;
    })
};*/
export default {
    getUserDetailsController,
    createUserDetailsController,
    updateUserDetailsController
};