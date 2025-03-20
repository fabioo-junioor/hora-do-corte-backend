import { getUserDetailsBySlugModel, getUserDetailsByFkModel,
    createUserDetailsModel, updateUserDetailsModel } from '../models/userDetails.model.js';
import { getTimeZone } from '../helpers/global.helper.js';

const dateToday = getTimeZone();

const getUserDetailsByPkController = async (req, res) => {
    try {
        const pkUser = req.params.pk;
       
        const dataUserDetails = await getUserDetailsByFkModel(pkUser);
        if(!dataUserDetails){
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataUserDetails.length === 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Complete o cadastro!',
                data: []
                
            });
        };        
        return res.status(200).json({
            statusCode: 200,
            message: 'Dados do usuário!',
            data: dataUserDetails.map((
                { dateTimeRegistration, ...rest }) => rest
                
            )
        });
    }catch(error){
        return res.status(500).json({
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
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataUserDetails.length === 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'O usuário não existe!',
                data: []
                
            });
        };        
        return res.status(200).json({
            statusCode: 200,
            message: 'Dados do usuário!',
            data: dataUserDetails.map((
                { dateTimeRegistration, ...rest }) => rest
                
            )
        });
    }catch(error){
        return res.status(500).json({
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
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataUserDetails.length !== 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Dados de usuário já existe!',
                data: []
                
            });
        };
        
        const dataUserDetailsSlug = await getUserDetailsBySlugModel(slug);
        if(!dataUserDetailsSlug){
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataUserDetailsSlug.length !== 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'O nome de usuário já existe!',
                data: []
                
            });
        };        
        const dataResult = await createUserDetailsModel(name, slug, phone, instagram, image, cep, state, city, street, number, dateToday, pkUser);
        if(!dataResult){
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows !== 0){
            return res.status(201).json({
                statusCode: 201,
                message: 'Dados salvos!',
                data: []

            });
        };
    }catch(error){
        return res.status(500).json({
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
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if((dataUserDetails.length !== 0) && (dataUserDetails[0]?.fkUser != pkUser)){
            return res.status(200).json({
                statusCode: 200,
                message: 'O nome de usuário já existe!',
                data: []
                
            });
        };
        const dataResult = await updateUserDetailsModel(name, slug, phone, instagram, image, cep, state, city, street, number, pkUser);
        if(!dataResult){
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows !== 0){
            return res.status(201).json({
                statusCode: 201,
                message: 'Dados salvos!',
                data: []
    
            });
        };
    }catch(error){
        return res.status(500).json({
            statusCode: 500,
            message: 'Error ao criar o registro!'

        });
    };
};

export default {
    getUserDetailsController,
    getUserDetailsByPkController,
    createUserDetailsController,
    updateUserDetailsController
    
};