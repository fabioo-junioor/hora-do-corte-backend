const generatorPass = () => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
    let password = '';
    let lengthPass = 12;
    for(let i = 0; i < lengthPass; i++){
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];

    };
    return password;

};

export {
    generatorPass

};