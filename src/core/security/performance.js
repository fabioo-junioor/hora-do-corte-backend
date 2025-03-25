import rateLimit from 'express-rate-limit';

const limiter = () => {
    return rateLimit({
        windowMs: 15 * 60 * 1000, // 15min!
        max: 50, // Limite de 50 req por IP!
        message: 'Muitas requisições deste IP, tente novamente mais tarde.'
    
    });
};

export {
    limiter

};