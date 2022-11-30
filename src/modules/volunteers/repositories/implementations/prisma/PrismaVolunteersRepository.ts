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

    async deleteById(id: string): Promise<void> {
        await this.prisma.volunteer.delete({ where: { id } });
    }

    async getVolunteerById(id: string): Promise<Volunteer | null> {
        const volunteer = await this.prisma.volunteer.findUnique({
            where: { id },
        });

        if (!volunteer) return null;

        return new Volunteer(volunteer);
    }

    async updateCurrentlyParticipation({
        id,
        currentlyParticipation,
    }: UpdateVolunteersInput): Promise<void> {
        await this.prisma.volunteer.update({
            where: { id },
            data: { isCurrentlyParticipating: currentlyParticipation },
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
        page,
        searchTerm
    }: GetVolunteersInput): Promise<Volunteer[]> {
        const parsedPage = page || 0
        const parsedLimit = limit || 20
        const listOfVolunteers = await this.prisma.volunteer.findMany({
            take: parsedLimit,
            skip: parsedPage * parsedLimit,
            where: {
                email: {
                    contains: '@',
                },
                ...searchTerm && {
                    body: {
                        search: searchTerm
                    }
                }
            },
        });

        return listOfVolunteers.map(
            (volunteer) => new Volunteer(volunteer)
        );

        
    }
}
