import { constEnumType } from '../../../utils/ConstEnumType';
import { participation, Volunteer } from '../entities/Volunteer';

export type GetVolunteersInput = {
    limit: number;
    lastVolunteerId: string | null;
};

export type UpdateVolunteersInput = {
    id: string;
    participation: constEnumType<typeof participation>;
};

export interface IVolunteersRepository {
    checkIfVolunteerExistsByEmail(email: string): Promise<boolean>;

    saveVolunteer(volunteer: Volunteer): Promise<boolean>;

    getVolunteer(email: string): Promise<Volunteer>;

    getVolunteers({
        limit,
        lastVolunteerId,
    }: GetVolunteersInput): Promise<Volunteer[]>;

    updateVolunteerParticipation({
        id,
        participation,
    }: UpdateVolunteersInput): Promise<void>;

    setVerifiedEmailToTrue(email: string): Promise<void>;
}
