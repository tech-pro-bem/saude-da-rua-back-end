import { SendEmailToVolunteerNodemailer } from '../../services/Nodemailer';
import SendEmailToVolunteerUseCase from './SendEmailToVolunteerUseCase';

const sendEmailToVolunteerNodemailer = new SendEmailToVolunteerNodemailer();

const sendEmailToVolunteerUseCase = new SendEmailToVolunteerUseCase(
    sendEmailToVolunteerNodemailer
);

export default sendEmailToVolunteerUseCase;
