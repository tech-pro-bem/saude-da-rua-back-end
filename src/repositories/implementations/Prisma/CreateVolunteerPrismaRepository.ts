import { PrismaClient } from '@prisma/client';
import { Volunteer } from '../../../entities/Volunteer';
import { PrismaPostgresClient } from '../../../helpers/database/PrismaPostgresClient';
import { ICreateVolunteerRepository } from '../../interfaces';

export class CreateVolunteerPrismaRepository
    extends PrismaPostgresClient
    implements ICreateVolunteerRepository
{
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = super.getPrismaClient();
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
}
