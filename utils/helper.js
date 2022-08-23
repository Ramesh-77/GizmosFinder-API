const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    transporter.verify((err, success) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Ready for messages");
        console.log(success);
      }
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email send successfully, check ur email");
  } catch (error) {
    console.log("Email not sent");
    console.log(error);
  }
};
