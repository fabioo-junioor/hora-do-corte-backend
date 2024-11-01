import { getUserDetailsBySlugModel, getUserDetailsByFkModel,
    createUserDetailsModel, updateUserDetailsModel } from '../models/userDetails.model.js';

const dateToday = new Date();

const getUserDetailsByPkController = async (req, res) => {
    try {
        const pkUser = req.params.pk;
       
        const dataUserDetails = await getUserDetailsByFkModel(pkUser);
        if(!dataUserDetails){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataUserDetails.length === 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'O usuário não completou o cadastro!',
                data: dataUserDetails
                
            });
        };        
        return res.status(200).json({
            statusCode: 200,
            message: 'Dados do usuário!',
            data: dataUserDetails

        });
    }catch(error){
        res.status(500).json({
            statusCode: 500,
            message: 'Error ao criar o registro!'

        });
    };
};
const getUserDetailsController = async (req, res) => {
    try {
        const slug = req.params.slug;
        
        const dataUserDetails = await getUserDetailsBySlugModel(slug);
        if(!dataUserDetails){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataUserDetails.length === 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'O usuário não existe!',
                data: dataUserDetails
                
            });
        };        
        return res.status(200).json({
            statusCode: 200,
            message: 'Dados do usuário!',
            data: dataUserDetails

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
        const { name, slug, phone, instagram, image, cep, state, city, street, number, pkUser } = req.body;
        
        const dataUserDetails = await getUserDetailsByFkModel(pkUser);
        if(!dataUserDetails){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataUserDetails.length !== 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Dados de usuário já existe!'
                
            });
        };
        
        const dataUserDetailsSlug = await getUserDetailsBySlugModel(slug);
        if(!dataUserDetailsSlug){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataUserDetailsSlug.length !== 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'O nome de usuário já existe!'
                
            });
        };        
        const dataResult = await createUserDetailsModel(name, slug, phone, instagram, image, cep, state, city, street, number, dateToday, pkUser);
        if(!dataResult){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows !== 0){
            return res.status(201).json({
                statusCode: 201,
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
        const { name, slug, phone, instagram, image, cep, state, city, street, number } = req.body;
        
        const dataUserDetails = await getUserDetailsBySlugModel(slug);
        if(!dataUserDetails){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if((dataUserDetails.length !== 0) && (dataUserDetails[0]?.fkUser != pkUser)){
            return res.status(200).json({
                statusCode: 200,
                message: 'O nome de usuário já existe!'
                
            });
        };
        const dataResult = await updateUserDetailsModel(name, slug, phone, instagram, image, cep, state, city, street, number, pkUser);
        if(!dataResult){
            return res.status(502).json({
                statusCode: 502,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows !== 0){
            return res.status(201).json({
                statusCode: 201,
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
    getUserDetailsByPkController,
    createUserDetailsController,
    updateUserDetailsController
    
};