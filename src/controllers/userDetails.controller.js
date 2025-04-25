import { getUserDetailsBySlugModel, getUserDetailsByFkModel,
    createUserDetailsModel, updateUserDetailsModel } from '../models/userDetails.model.js';
import { getUserByPkModel } from '../models/user.model.js';
import { validAuthPk } from '../core/auth/auth.jwt.js';
import { getTimeZone } from '../helpers/global.helper.js';
import logger from '../core/security/logger.js';

const isActive = 1;;

const getUserDetailsController = async (req, res) => {
    try {
        const slug = req.params.slug;

        let dataUserDetails = await getUserDetailsBySlugModel(slug);
        if(!dataUserDetails){
            logger.error('Erro na conexão', { status: { code: 500, path: req.path }, context: { slug: slug }});
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
        logger.error(error.message, { status: { code: 500, path: req.path }});
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
            logger.warn('Operação inválida', { status: { code: 400, path: req.path }, context: { pkUser: pkUser }});
            return res.status(400).json({
                statusCode: 400,
                message: 'Operação inválida!'

            });
        };
       
        let dataUserDetails = await getUserDetailsByFkModel(pkUser);
        if(!dataUserDetails){
            logger.error('Erro na conexão', { status: { code: 500, path: req.path }, context: { pkUser: pkUser }});
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
        logger.error(error.message, { status: { code: 500, path: req.path }});
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
            logger.warn('Operação inválida', { status: { code: 400, path: req.path }, context: { pkUser: pkUser }});
            return res.status(400).json({
                statusCode: 400,
                message: 'Operação inválida!'

            });
        };

        let dataUserDetails = await getUserDetailsByFkModel(pkUser);
        if(!dataUserDetails){
            logger.error('Erro na conexão', { status: { code: 500, path: req.path }, context: { pkUser: pkUser }});
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataUserDetails.length !== 0){
            logger.warn('Dados de usuário já existe', { status: { code: 200, path: req.path }, context: { pkUser: pkUser }});
            return res.status(200).json({
                statusCode: 200,
                message: 'Dados de usuário já existe!',
                data: []
                
            });
        };
        
        let dataUserDetailsSlug = await getUserDetailsBySlugModel(slug);
        if(!dataUserDetailsSlug){
            logger.error('Erro na conexão', { status: { code: 500, path: req.path }, context: { pkUser: pkUser }});
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataUserDetailsSlug.length !== 0){
            logger.warn('Nome de usuario já existe', { status: {code: 200, path: req.path }, context: { pkUser: pkUser, slug: slug }});
            return res.status(200).json({
                statusCode: 200,
                message: 'O nome de usuário já existe!',
                data: []
                
            });
        };   
             
        let dataResult = await createUserDetailsModel(name, slug, phone, instagram, image, cep, state, city, street, number, getTimeZone(), getTimeZone(), pkUser);
        if(!dataResult){
            logger.error('Erro na conexão', { status: { code: 500, path: req.path }, context: { pkUser: pkUser }});
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows !== 0){
            logger.info('Detalhes criados', { status: { code: 201, path: req.path }, context: { pkUser: pkUser }});
            return res.status(201).json({
                statusCode: 201,
                message: 'Dados salvos!',
                data: []

            });
        };
    }catch(error){
        logger.error(error.message, { status: { code: 500, path: req.path }});
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
            logger.warn('Operação inválida', { status: { code: 400, path: req.path }, context: { pkUser: pkUser }});
            return res.status(400).json({
                statusCode: 400,
                message: 'Operação inválida!'

            });
        };
        
        let dataUserDetails = await getUserDetailsBySlugModel(slug);
        if(!dataUserDetails){
            logger.error('Erro na conexão', { status: { code: 500, path: req.path }, context: { pkUser: pkUser }});
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if((dataUserDetails.length !== 0) && (dataUserDetails[0]?.fkUser != pkUser)){
            logger.warn('Nome de usuário já existe', { status: { code: 200, path: req.path }, context: { pkUser: pkUser, slug: slug }});
            return res.status(200).json({
                statusCode: 200,
                message: 'O nome de usuário já existe!',
                data: []
                
            });
        };

        let dataResult = await updateUserDetailsModel(name, slug, phone, instagram, image, cep, state, city, street, number, getTimeZone(), pkUser);
        if(!dataResult){
            logger.error('Erro na conexão', { status: { code: 500, path: req.path }, context: { pkUser: pkUser }});
            return res.status(500).json({
                statusCode: 500,
                message: 'Algo deu errado na conexão!'

            });
        };
        if(dataResult.affectedRows !== 0){
            logger.info('Detalhes atualizados', { status: { code: 201, path: req.path }, context: { pkUser: pkUser }});
            return res.status(201).json({
                statusCode: 201,
                message: 'Dados salvos!',
                data: []
    
            });
        };
    }catch(error){
        logger.error(error.message, { status: { code: 500, path: req.path }});
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