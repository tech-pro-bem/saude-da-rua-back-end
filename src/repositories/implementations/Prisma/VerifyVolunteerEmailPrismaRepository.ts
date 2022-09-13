import { PrismaClient } from '@prisma/client';
import { PrismaPostgresClient } from '../../../helpers/database/PrismaPostgresClient';
import { IVerifyVolunteerEmailRepository } from '../../interfaces';

export class VerifyVolunteerEmailPrismaRepository
    extends PrismaPostgresClient
    implements IVerifyVolunteerEmailRepository
{
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = super.getPrismaClient();
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
            },
        });
    }
}
