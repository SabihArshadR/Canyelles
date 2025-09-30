import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendVerificationEmail(to: string, code: string, name: string) {
  const mailOptions = {
    from: `Els amics de la cinglera basàltica <${process.env.SMTP_USER}>`,
    to,
    subject: "Codi de verificació – Els amics de la cinglera basàltica",
    text: `
Hola ${name},

Gràcies per registrar-te a Els amics de la cinglera basàltica.

El teu codi de verificació és: ${code}
Aquest codi caduca en 15 minuts.

Introdueix aquest codi a l'aplicació per completar el teu registre.

Aquest és un correu automàtic, no cal respondre.
    `,
    html: `
      <p>Hola <b>${name}</b>,</p>
      <p>Gràcies per registrar-te a <b>Els amics de la cinglera basàltica</b>.</p>
      <p>El teu codi de verificació és:</p>
      <h2 style="color:#2c3e50; font-size:20px; letter-spacing:2px;">${code}</h2>
      <p>Introdueix aquest codi a l'aplicació per completar el teu registre.</p>
      <br/>
      <p><i>Aquest és un correu automàtic, no cal respondre.</i></p>
    `,
  };

  await transporter.sendMail(mailOptions);
}


export async function sendConfirmationEmail(to: string, name: string) {
  const mailOptions = {
    from: `Els amics de la cinglera basàltica <${process.env.SMTP_USER}>`,
    to,
    subject: "Registration Confirmation – Els amics de la cinglera basàltica",
    text: `
Hello ${name},

Your registration at Els amics de la cinglera basàltica has been successfully completed.
You can now start enjoying the experience.

This is an automatic email, no reply is needed.
    `,
    html: `
      <p>Hello <b>${name}</b>,</p>
      <p>Your registration at <b>Els amics de la cinglera basàltica</b> has been successfully completed.</p>
      <p>You can now start enjoying the experience.</p>
      <br/>
      <p><i>This is an automatic email, no reply is needed.</i></p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendResetPasswordEmail(to: string, name: string, resetUrl: string) {
  const mailOptions = {
    from: `Els amics de la cinglera basàltica <${process.env.SMTP_USER}>`,
    to,
    subject: "Recuperació de contrasenya – Els amics de la cinglera basàltica",
    text: `
Hola ${name},

Hem rebut una sol·licitud per restablir la contrasenya del teu compte a Els amics de la cinglera basàltica.

Per crear una contrasenya nova, fes clic en aquest enllaç:
${resetUrl}

L’enllaç caduca en 15 minuts.

Si no has demanat aquest canvi, pots ignorar aquest missatge.

Aquest és un correu automàtic, no cal respondre.
    `,
    html: `
      <p>Hola <b>${name}</b>,</p>
      <p>Hem rebut una sol·licitud per restablir la contrasenya del teu compte a <b>Els amics de la cinglera basàltica</b>.</p>
      <p>Per crear una contrasenya nova, fes clic en aquest enllaç:</p>
      <p><a href="${resetUrl}" target="_blank">${resetUrl}</a></p>
      <p>Si no has demanat aquest canvi, pots ignorar aquest missatge.</p>
      <br/>
      <p><i>Aquest és un correu automàtic, no cal respondre.</i></p>
    `,
  };

  await transporter.sendMail(mailOptions);
}