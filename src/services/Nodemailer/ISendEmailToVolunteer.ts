/* eslint-disable no-unused-vars */
import Email from '../../entities/Email';

export interface ISendEmailToVolunteer {
    sendEmail(email: Email): Promise<void>;
}
