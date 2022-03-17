import { createTransport, Transporter } from 'nodemailer';
import { SentMessageInfo, Options } from 'nodemailer/lib/smtp-transport';
import Email from '../../entities/Email';
import { ISendEmailToVolunteer } from '../ISendEmailToVolunteer';

export class SendEmailToVolunteerNodemailer implements ISendEmailToVolunteer {
    private gmail: string;

    private password: string;

    constructor() {
        this.gmail = process.env.USER_NODEMAILER_GMAIL;
        this.password = process.env.PASSWORD_NODEMAILER_GMAIL;
    }

    public async sendEmail(email: Email): Promise<void> {
        const mailOptions: Options = {
            name: 'Tech Pro Bem',
            from: this.gmail,
            to: email.to,
            subject: email.subject,
            html: email.htmlMessage,
        };

        const smtpOptions: Options = {
            service: 'gmail',
            host: 'smtp.gmail.com',
            secure: false,
            auth: {
                user: this.gmail,
                pass: this.password,
            },
            tls: {
                rejectUnauthorized: false,
            },
        };

        const transporter: Transporter<SentMessageInfo> =
            createTransport(smtpOptions);

        await transporter.sendMail(mailOptions);
    }
}
