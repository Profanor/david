const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');

 const sendEmail = (req, res) => {
    const { name, email, message } = req.body;
    const fullName = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    // read email templates
    const subjectTemplate = fs.readFileSync('./emailTemplates/emailSubject.hbs', 'utf8');
    const bodyTemplate = fs.readFileSync('./emailTemplates/emailBody.hbs', 'utf8');

    // compile templates
    const compiledSubjectTemplate = handlebars.compile(subjectTemplate);
    const compiledBodyTemplate = handlebars.compile(bodyTemplate);

    // render templates with form data
    const subject = compiledSubjectTemplate({ name: fullName });
    const body = compiledBodyTemplate({ name, email, message });

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_USER, 
            pass: process.env.SMTP_PASS
        }
    });

    // compose the email message
    const mailOptions = {
        from: process.env.SMTP_USER, // sender address
        to: process.env.DESTINATION_EMAIL, 
        subject,
        text: body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
};

module.exports = sendEmail;