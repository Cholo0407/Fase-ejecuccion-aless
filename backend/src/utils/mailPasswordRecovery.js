import nodemailer from "nodemailer";
import { config } from "../config.js";

// Configurar el transporter
// ¿Quien envía el correo?
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

// ¿Quien lo envia?
const sendEmail = async (to, subject, body, html) => {
  try {
    const info = await transporter.sendMail({
      from: "aless070704@gmail.com",
      to, // Para quien
      subject, // El asunto
      body, //Cuerpo del mensaje
      html, //HTML
    });

    return info;
  } catch (error) {
    console.log("error" + error);
  }
};

// Función para generar el HTML del correo de recuperación de contraseña
const HTMLRecoveryEmail = (code) => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafc; padding: 30px; border: 1px solid #ccc; border-radius: 8px; max-width: 600px; margin: 0 auto; text-align: center;">
        <h2 style="color: #34495e; margin-bottom: 15px;">Restablecimiento de Contraseña</h2>
            <p style="color: #555; font-size: 15px; line-height: 1.6;">
                Hola, hemos recibido una solicitud para restablecer tu contraseña. Usa el siguiente código para completar el proceso:
            </p>

            <div style="background-color: #3498db; color: #ffffff; font-size: 20px; font-weight: bold; padding: 12px 24px; display: inline-block; margin: 20px 0; border-radius: 6px;">
                ${code}
            </div>

            <p style="color: #666; font-size: 14px;">
                Este código es válido por los próximos <strong>15 minutos</strong>. Si no solicitaste este cambio, puedes ignorar este mensaje.
            </p>

            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;">

            <small style="color: #999; font-size: 12px;">
                ¿Necesitas ayuda? Contacta a nuestro equipo de soporte en
                <a href="mailto:soporte@tudominio.com" style="color: #2980b9; text-decoration: none;">soporte@tudominio.com</a>
            </small>
    </div>

    `;
};

export { sendEmail, HTMLRecoveryEmail };
