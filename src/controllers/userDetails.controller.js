import { getUserDetailsBySlugModel, getUserDetailsByFkModel,
    createUserDetailsModel, updateUserDetailsModel } from '../models/userDetails.model.js';
import { getUserByPkModel } from '../models/user.model.js';
import { validAuthPk } from '../core/auth/auth.jwt.js';
import { getTimeZone } from '../helpers/global.helper.js';

const isActive = 1;;

const getUserDetailsController = async (req, res) => {
    try {
        const slug = req.params.slug;

        let dataUserDetails = await getUserDetailsBySlugModel(slug);
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

        let dataUser = await getUserByPkModel(dataUserDetails[0].fkUser);
        if(dataUser[0].isActive == 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'O usuário não existe!',
                data: []
                
            });
        };
        if(dataUser[0].isBlocked == 1){
            return res.status(200).json({
                statusCode: 200,
                message: 'Usuário indisponivel!',
                data: []
                
            });
        };
        return res.status(200).json({
            statusCode: 200,
            message: 'Dados do usuário!',
            data: dataUserDetails.map((
                { createdAt, updatedAt, ...rest }) => rest
                
            )
        });
    }catch(error){
        return res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};
const getUserDetailsByPkController = async (req, res) => {
    try {
        const pkUser = req.params.pk;

        if(!await validAuthPk(req, pkUser)){
            return res.status(400).json({
                statusCode: 400,
                message: 'Operação inválida!'

            });
        };
       
        let dataUserDetails = await getUserDetailsByFkModel(pkUser);
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
                { createdAt, updatedAt, ...rest }) => rest
                
            )
        });
    }catch(error){
        return res.status(500).json({
            statusCode: 500,
            message: error.message

        });
    };
};
const createUserDetailsController = async (req, res) => {
    try {
        const { name, slug, phone, instagram, image, cep, state, city, street, number, pkUser } = req.body;
        
        if(!await validAuthPk(req, pkUser)){
            return res.status(400).json({
                statusCode: 400,
                message: 'Operação inválida!'

            });
        };

        let dataUserDetails = await getUserDetailsByFkModel(pkUser);
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
        
        let dataUserDetailsSlug = await getUserDetailsBySlugModel(slug);
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
             
        let dataResult = await createUserDetailsModel(name, slug, phone, instagram, image, cep, state, city, street, number, getTimeZone(), getTimeZone(), pkUser);
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
            message: error.message

        });
    };
};
const updateUserDetailsController = async (req, res) => {
    try {
        const pkUser = req.params.pk;
        const { name, slug, phone, instagram, image, cep, state, city, street, number } = req.body;

        if(!await validAuthPk(req, pkUser)){
            return res.status(400).json({
                statusCode: 400,
                message: 'Operação inválida!'

            });
        };
        
        let dataUserDetails = await getUserDetailsBySlugModel(slug);
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

        let dataResult = await updateUserDetailsModel(name, slug, phone, instagram, image, cep, state, city, street, number, getTimeZone(), pkUser);
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
            message: error.message

        });
    };
};

export default {
    getUserDetailsController,
    getUserDetailsByPkController,
    createUserDetailsController,
    updateUserDetailsController
    
};