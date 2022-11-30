import { Volunteer } from '../entities/Volunteer';

export type GetVolunteersInput = {
    limit: number;
    page: number | null;
    searchTerm?: string;
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

    deleteById(id: string): Promise<void>;

    getVolunteers({
        limit,
        page,
        searchTerm
    }: GetVolunteersInput): Promise<[number, Volunteer[]]>;

    updateCurrentlyParticipation({
        id,
        currentlyParticipation,
    }: UpdateVolunteersInput): Promise<void>;

    setVerifiedEmailToTrue(email: string): Promise<void>;
}
