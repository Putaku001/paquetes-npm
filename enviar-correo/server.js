const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/send-email', async (req, res) => {
    const { recipient, subject, body } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'kennethgranados64@gmail.com',
                pass: 'vfxz twmj ojra ylbu'
            }
        });

        const mensaje = {
            from: 'kennethgranados64@gmail.com',
            to: recipient,
            subject: subject,
            text: body
        };

        const info = await transporter.sendMail(mensaje);
        console.log('Correo enviado:', info);
        res.status(200).send('Correo enviado exitosamente.');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).send('Error al enviar el correo.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
