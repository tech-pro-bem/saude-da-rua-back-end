import { SendEmailToVolunteerNodemailer } from '../../../../services/Nodemailer/SendEmailToVolunteerNodemailer';
import SendEmailToVolunteerUseCase from './SendEmailToVolunteerUseCase';

const sendEmailToVolunteerNodemailer = new SendEmailToVolunteerNodemailer();

const sendEmailToVolunteerUseCase = new SendEmailToVolunteerUseCase(
    sendEmailToVolunteerNodemailer
);

export { sendEmailToVolunteerUseCase };
