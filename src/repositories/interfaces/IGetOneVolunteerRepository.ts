/* eslint-disable no-unused-vars */
import { Volunteer } from '../../entities/Volunteer';

export interface IGetOneVolunteerRepository {
    getVolunteer(email: string): Promise<Volunteer>;
}
