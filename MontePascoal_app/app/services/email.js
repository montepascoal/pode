const nodemailer = require('nodemailer');

class Email {
  async sendPassword(email, name, password) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SSL,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: { rejectUnauthorized: false },
      });

      await transporter.sendMail({
        from: `"Monte Pascoal" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Nova senha para o sistema Monte Pascoal',
        html: `
                <div style="padding: 16px;">
                    <div style="margin-bottom: 32px;">
                        <h2>Monte Pascoal</h2>
                    </div>
                    <h3>Olá, ${name}</h3>
                    <p style="font-size: 16px;">
                        Recebemos sua solicitação de geração de senha. <br />
                        Ao acessar o sistema <span style="color: red">altere a senha</span> por questão de segurança.
                    </p>
                    <p style="font-size: 18px; font-weight: bold;">
                        Sua senha de recuperação é <strong>${password}</strong>
                    </p>
                    <p style="font-size: 16px; margin-top: 32px;">
                        Em caso de dúvidas entre em contato com <span style="font-weight: bold;">Monte Pascoal<span>.
                    </p>
                </div>
                `,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new Email();
