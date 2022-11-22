import { Volunteer } from '../entities/Volunteer';

export type GetVolunteersInput = {
    limit: number;
    lastVolunteerId: string | null;
};

export type UpdateVolunteersInput = {
    id: string;
    currentlyParticipation: boolean;
};

export interface IVolunteersRepository {
    checkIfVolunteerExistsByEmail(email: string): Promise<boolean>;

    saveVolunteer(volunteer: Volunteer): Promise<boolean>;

    getVolunteer(email: string): Promise<Volunteer>;

    getVolunteerById(id: string): Promise<Volunteer | null>;

    getVolunteers({
        limit,
        lastVolunteerId,
    }: GetVolunteersInput): Promise<Volunteer[]>;

    updateCurrentlyParticipation({
        id,
        currentlyParticipation,
    }: UpdateVolunteersInput): Promise<void>;

    setVerifiedEmailToTrue(email: string): Promise<void>;
}
