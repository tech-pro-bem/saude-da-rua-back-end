import { PrismaClient } from '@prisma/client';
import { Volunteer } from '../../../entities/Volunteer';
import { PrismaPostgresClient } from '../../../helpers/database/PrismaPostgresClient';
import { IGetOneVolunteerRepository } from '../../interfaces';

export class GetOneVolunteerPrismaRepository
    extends PrismaPostgresClient
    implements IGetOneVolunteerRepository
{
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = super.getPrismaClient();
    }

    async getVolunteer(email: string): Promise<Volunteer> {
        const volunteer = await this.prisma.volunteer.findFirst({
            where: { email },
        });

        if (!volunteer) return undefined;

        return new Volunteer(volunteer);
    }
}
