import { Volunteer } from '../../../entities/Volunteer';
import {
    GetVolunteersInput,
    IVolunteersRepository,
    UpdateVolunteersInput,
} from '../../IVolunteersRepository';

export class InMemoryVolunteersRepository implements IVolunteersRepository {
    async updateVolunteerParticipation({
        id,
        participation,
    }: UpdateVolunteersInput): Promise<void> {
        const volunteerIndex = this.volunteers.findIndex((v) => v.id === id);

        this.volunteers[volunteerIndex] = {
            ...this.volunteers[volunteerIndex],
            hasParticipated: participation,
        };
    }

    private volunteers: Volunteer[] = [];

    async checkIfVolunteerExistsByEmail(email: string): Promise<boolean> {
        const volunteer = this.volunteers.find((v) => v.email === email);

        if (volunteer) return true;

        return false;
    }

    async saveVolunteer(volunteer: Volunteer): Promise<boolean> {
        const volunteerIndex = this.volunteers.findIndex(
            (v) => v.id === volunteer.id
        );

        if (volunteerIndex > -1) {
            this.volunteers[volunteerIndex] = volunteer;
            return true;
        }

        this.volunteers.push(volunteer);
        return true;
    }

    async getVolunteer(email: string): Promise<Volunteer> {
        return this.volunteers.find((v) => v.email === email);
    }

    async getVolunteers({
        limit,
        lastVolunteerId,
    }: GetVolunteersInput): Promise<Volunteer[]> {
        const lastVolunteerIndex = this.volunteers.findIndex(
            (v) => v.id === lastVolunteerId
        );

        return this.volunteers.slice(
            lastVolunteerIndex,
            lastVolunteerIndex + limit
        );
    }

    async setVerifiedEmailToTrue(email: string): Promise<void> {
        const volunteerIndex = this.volunteers.findIndex(
            (v) => v.email === email
        );

        this.volunteers[volunteerIndex] = {
            ...this.volunteers[volunteerIndex],
            verifiedEmail: true,
        };
    }
}
