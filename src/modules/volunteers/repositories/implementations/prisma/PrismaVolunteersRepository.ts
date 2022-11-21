import { PrismaClient } from '@prisma/client';
import { PrismaPostgresClient } from '../../../../../helpers/database/PrismaPostgresClient';
import { Volunteer } from '../../../entities/Volunteer';
import {
    GetVolunteersInput,
    IVolunteersRepository,
    UpdateVolunteersInput,
} from '../../IVolunteersRepository';

export class PrismaVolunteersRepository
    extends PrismaPostgresClient
    implements IVolunteersRepository
{
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = this.getPrismaClient();
    }

    async updateVolunteerParticipation({
        id,
        participation,
    }: UpdateVolunteersInput): Promise<void> {
        await this.prisma.volunteer.update({
            where: { id },
            data: { hasParticipated: participation },
        });
    }

    async setVerifiedEmailToTrue(email: string): Promise<void> {
        const updateVolunteerInput = await this.prisma.volunteer.findFirst({
            where: {
                email,
            },
        });

        await this.prisma.volunteer.update({
            where: {
                id: updateVolunteerInput.id,
            },
            data: {
                ...updateVolunteerInput,
                verifiedEmail: true,
            },
        });
    }

    async checkIfVolunteerExistsByEmail(email: string): Promise<boolean> {
        const volunteer = await this.prisma.volunteer.findFirst({
            where: { email },
        });

        if (volunteer) return true;

        return false;
    }

    async saveVolunteer(volunteer: Volunteer): Promise<boolean> {
        await this.prisma.volunteer.upsert({
            create: volunteer,
            where: { id: volunteer.id },
            update: volunteer,
        });

        return true;
    }

    async getVolunteer(id: string): Promise<Volunteer> {
        const volunteer = await this.prisma.volunteer.findFirst({
            where: { id },
        });

        if (!volunteer) return undefined;

        return new Volunteer(volunteer);
    }

    async getVolunteers({
        limit,
        lastVolunteerId,
    }: GetVolunteersInput): Promise<Volunteer[]> {
        const listOfVolunteers = await this.prisma.volunteer.findMany({
            take: limit,
            cursor: lastVolunteerId ? { id: lastVolunteerId } : undefined,
            where: {
                email: {
                    contains: '@',
                },
            },
        });

        const volunteers = listOfVolunteers.map(
            (volunteer) => new Volunteer(volunteer)
        );

        return volunteers.filter(
            (volunteer) => volunteer.id !== lastVolunteerId
        );
    }
}
