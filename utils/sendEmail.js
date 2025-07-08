import nodemailer from "nodemailer";

const sendConfirmationEmail = async ({ to, name }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"Maitri Global Consultancy" <no-reply@maitriglobal.com>',
      to,
      subject: "Your application has been received!",
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for applying to work as a healthcare professional in Italy through Maitri Global Consultancy.</p>
        <p>Our team will review your application and contact you shortly.</p>
        <p>Kind regards,<br/>Maitri Global Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Trying to send email to: ${to}`);

    console.log(`Confirmation email sent to ${to}`);
  } catch (err) {
    console.error("Email sending error:", err.message);
  }
};

export default sendConfirmationEmail;
