import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,   // Gmail App Password
  },
});

/**
 * Send contact form email to portfolio owner.
 * @param {{ name, email, subject, message }} data
 */
const sendContactEmail = async ({ name, email, subject, message }) => {
  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
    to:   process.env.MAIL_TO,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
        <h2 style="color:#1A6B4A;border-bottom:2px solid #D6EFE4;padding-bottom:12px;">
          New message from your portfolio
        </h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:8px 0;color:#6B7280;width:80px;">Name</td>
              <td style="padding:8px 0;font-weight:500;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#6B7280;">Email</td>
              <td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#6B7280;">Subject</td>
              <td style="padding:8px 0;">${subject}</td></tr>
        </table>
        <div style="margin-top:20px;padding:20px;background:#F8F6F1;border-radius:8px;font-size:14px;line-height:1.7;color:#3B4252;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        <p style="margin-top:20px;font-size:12px;color:#9CA3AF;">
          Sent from ayomide.dev portfolio contact form
        </p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

export { sendContactEmail };
