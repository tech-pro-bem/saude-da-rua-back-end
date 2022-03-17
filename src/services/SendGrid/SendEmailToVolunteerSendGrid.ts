import sgMail, { MailDataRequired } from '@sendgrid/mail';
import Email from '../../entities/Email';
import { ISendEmailToVolunteer } from '../ISendEmailToVolunteer';

export class SendEmailToVolunteerSendGrid implements ISendEmailToVolunteer {
    private from_email = process.env.USER_SENDGRID_GMAIL;

    constructor() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    }

    public async sendEmail(email: Email): Promise<void> {
        const emailForm: MailDataRequired = {
            to: email.to,
            from: {
                name: 'Tech Pro Bem',
                email: this.from_email,
            },
            subject: email.subject,
            html: email.htmlMessage,
        };

        await sgMail.send(emailForm).then(
            () => {},
            (error) => {
                throw new Error(error);
            }
        );
    }
}
