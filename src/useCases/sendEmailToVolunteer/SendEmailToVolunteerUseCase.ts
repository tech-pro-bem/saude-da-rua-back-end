import Email from '../../entities/Email';
import { ISendEmailToVolunteer } from '../../services/ISendEmailToVolunteer';

class SendEmailToVolunteerUseCase {
    private sendEmailToVolunteer: ISendEmailToVolunteer;

    constructor(sendEmailToVolunteer: ISendEmailToVolunteer) {
        this.sendEmailToVolunteer = sendEmailToVolunteer;
    }

    async execute(sendEmailToVolunteerData: string): Promise<void> {
        const email = sendEmailToVolunteerData;

        const newEmail = new Email({
            to: email,
            subject: 'Teste de email',
            htmlMessage: '<p>TESTE</p>',
        });

        await this.sendEmailToVolunteer.sendEmail(newEmail);
    }
}

export default SendEmailToVolunteerUseCase;
