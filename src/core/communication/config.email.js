import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.MAILHOST,
    port: process.env.MAILPORT,
    secure: true,
    auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASS
        
    }
});
const sendEmail = async (destination, subject, text) => {
    const info = await transporter.sendMail({
        from: process.env.MAILUSERFROM,
        to: destination,
        subject: `<Hora do corte> ${subject}`,
        text: text
        
    });
    return info.response;
    
};

export {
    sendEmail

};