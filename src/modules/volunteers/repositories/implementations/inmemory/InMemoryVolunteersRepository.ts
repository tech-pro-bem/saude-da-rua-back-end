import { Volunteer } from '../../../entities/Volunteer';
import {
    GetVolunteersInput,
    IVolunteersRepository,
    UpdateVolunteersInput,
} from '../../IVolunteersRepository';

export class InMemoryVolunteersRepository implements IVolunteersRepository {
    async deleteById(id: string): Promise<void> {
        const volunteerIndex = this.volunteers.findIndex((v) => v.id === id);

        this.volunteers.splice(volunteerIndex, 1);
    }

    async getVolunteerById(id: string): Promise<Volunteer | null> {
        const volunteer = this.volunteers.find((v) => v.id === id);

        if (!volunteer) return null;

        return volunteer;
    }

    async updateCurrentlyParticipation({
        id,
        currentlyParticipation,
    }: UpdateVolunteersInput): Promise<void> {
        const volunteerIndex = this.volunteers.findIndex((v) => v.id === id);

        this.volunteers[volunteerIndex] = {
            ...this.volunteers[volunteerIndex],
            isCurrentlyParticipating: currentlyParticipation,
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

    async getVolunteers(_: GetVolunteersInput): Promise<Volunteer[]> {
        return this.volunteers
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
