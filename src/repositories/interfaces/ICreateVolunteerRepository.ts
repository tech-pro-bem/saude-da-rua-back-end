/* eslint-disable no-unused-vars */
import { Volunteer } from '../../entities/Volunteer';

export interface ICreateVolunteerRepository {
    checkIfVolunteerExistsByEmail(email: string): Promise<boolean>;

    saveVolunteer(volunteer: Volunteer): Promise<boolean>;
}
