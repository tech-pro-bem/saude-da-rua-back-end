import Email from '../../entities/Email';
import { ISendEmailToVolunteer } from '../../services/ISendEmailToVolunteer';
import { CreateJwt } from '../../utils/auth';

class SendEmailToVolunteerUseCase {
    private sendEmailToVolunteer: ISendEmailToVolunteer;

    constructor(sendEmailToVolunteer: ISendEmailToVolunteer) {
        this.sendEmailToVolunteer = sendEmailToVolunteer;
    }

    async execute(sendEmailToVolunteerData: string): Promise<void> {
        const email = sendEmailToVolunteerData;

        const createVolunteerJWT = new CreateJwt({ payload: { email } });

        const volunteerToken: string = createVolunteerJWT.buildToken();

        const url = `https://o7cbeu27z5.execute-api.sa-east-1.amazonaws.com/verify/volunteer-email?token=${volunteerToken}`;

        const newEmail = new Email({
            to: email,
            subject: 'Verificação de email da ONG Saúde da Rua',
            htmlMessage: `<p>Confirmar email</p><br><a href="${url}">${url}</a>`,
        });

        await this.sendEmailToVolunteer.sendEmail(newEmail);
    }
}

export default SendEmailToVolunteerUseCase;
