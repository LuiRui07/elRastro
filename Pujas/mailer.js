const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: 'luisleonxiii@hotmail.com',
        pass: 'Rinoceronte@2'
    }
});

async function enviarCorreo(ganadorEmail, mensaje) {
    const mailOptions = {
        from: 'luisleonxiii@hotmail.com',
        to: ganadorEmail,
        subject: 'Tu Puja Ha Terminado',
        text: mensaje,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado al ganador');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
}


module.exports = {
    enviarCorreo
};
