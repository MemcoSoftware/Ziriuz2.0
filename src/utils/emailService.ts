import nodemailer from 'nodemailer';

// Configuración del servicio de envío de correos
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Cambia esto según tu proveedor de correo
  auth: {
    user: 'tu_correo@gmail.com', // Cambia esto por tu dirección de correo electrónico
    pass: 'tu_contraseña' // Cambia esto por tu contraseña de correo electrónico
  }
});

// Función para enviar correos electrónicos
export const sendEmail = async (to: string, subject: string, text: string): Promise<void> => {
  const mailOptions = {
    from: 'tu_correo@gmail.com', // Cambia esto por tu dirección de correo electrónico
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
