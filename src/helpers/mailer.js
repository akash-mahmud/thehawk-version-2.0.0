const nodemailer = require("nodemailer");

class Mailer {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mahmudakash177@gmail.com",
        pass: "gbhydvfflpzvnlnx",
      },
    });
  }

  
  async sendContactEmail(toEmail, subject, message , name) {
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.RECEIVER_EMAIL,
      subject: subject,
      text: `message from ${name}
email: ${toEmail}
${message}`,
    };

    return mailOptions;
  }

  
  sendMailAsync(mailOptions, callback) {
    this.transporter.sendMail(mailOptions, callback);
  }

  sendMailSync(mailOptions) {
    const mailer = this;

    return new Promise(function (resolve, reject) {
      mailer.transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
    });
  }
}

module.exports = Mailer;
