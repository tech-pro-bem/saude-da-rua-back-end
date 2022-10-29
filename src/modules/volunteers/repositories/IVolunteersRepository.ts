import { Volunteer } from '../entities/Volunteer';

export type GetVolunteersInput = {
    limit: number;
    lastVolunteerId: string | null;
};

export interface IVolunteersRepository {
    checkIfVolunteerExistsByEmail(email: string): Promise<boolean>;

    saveVolunteer(volunteer: Volunteer): Promise<boolean>;

    getVolunteer(email: string): Promise<Volunteer>;

    getVolunteers({
        limit,
        lastVolunteerId,
    }: GetVolunteersInput): Promise<Volunteer[]>;

    setVerifiedEmailToTrue(email: string): Promise<void>;
}
