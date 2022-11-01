/* eslint-disable no-unused-vars */

import { Email } from "../modules/volunteers/entities/Email";

export interface ISendEmailToVolunteer {
    sendEmail(email: Email): Promise<void>;
}
