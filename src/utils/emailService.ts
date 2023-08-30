import nodemailer from 'nodemailer';

// Configuración del servicio de envío de correos
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 456,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'makob811@gmail.com', // User email
    pass: 'Angel_30032' // User email password
  }
});

// Función para enviar correos electrónicos
export const sendEmail = async (to: string, subject: string, text: string): Promise<void> => {
  const mailOptions = {
    from: 'makob811@gmail.com', // Cambia esto por tu dirección de correo electrónico
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Correo electrónico enviado a: ${to}`);
  } catch (error) {
    console.error(`Error al enviar el correo electrónico: ${error}`);
    throw new Error(`Error al enviar el correo electrónico: ${error}`);
  }
};
