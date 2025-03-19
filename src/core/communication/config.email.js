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
const sendEmail = async (destination, subject, template) => {
    const info = await transporter.sendMail({
        from: process.env.MAILUSERFROM,
        to: destination,
        subject: `<Hora do corte> ${subject}`,
        html: template
        
    });
    return info.response;
    
};

export {
    sendEmail

};