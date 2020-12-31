const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const hogan = require('hogan.js');

let temp = fs.readFileSync(path.resolve(__dirname + '/index.html'), 'utf-8');
let complied = hogan.compile(temp);

const sendRecoveryEmail = async (user, token) => {
    console.log(__dirname);
    let transporter = await nodemailer.createTransport({
        host: 'smtp.chmail.ir',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAILUSER,
            pass: process.env.EMAILPASSWORD,
        },
    });

    let mailOptions = {
        from: process.env.EMAILUSER,
        to: user.email.toString(),
        subject: 'recoveryPassword',
        html: complied.render({ email: 'pau.ahq@gmail.com', name: 'amin' }),
    };
    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = sendRecoveryEmail;
