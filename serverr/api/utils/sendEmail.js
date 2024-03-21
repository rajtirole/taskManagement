import nodemailer from 'nodemailer'
import { config } from 'dotenv'
config()
const sendEmail = async function(email,subject ,message){
    let transporter=nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        port: 587, // port for secure SMTP
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        // secure: false,
        tls: {
            ciphers:'SSLv3'
         },
        auth:{
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD
        },
    });
    await transporter.sendMail({
        from: process.env.SMTP_FROM_EMAIL,
        to: 'rtech23456@gmail.com'||email,
        subject: subject,
        html:message,
    })
}
export default sendEmail;