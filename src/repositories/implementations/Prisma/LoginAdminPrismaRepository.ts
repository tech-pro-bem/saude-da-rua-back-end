import { PrismaClient } from '@prisma/client';
import { AdminDTO, ILoginAdminRepository } from '../../interfaces';
import { PrismaPostgresClient } from '../../../helpers/database/PrismaPostgresClient';

export class LoginAdminPrismaRepository
    extends PrismaPostgresClient
    implements ILoginAdminRepository
{
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = super.getPrismaClient();
    }

    async getAdminInfoByEmail(email: string): Promise<AdminDTO | null> {
        const adminUser = await this.prisma.admin.findFirst({
            where: {
                email,
            },
        });

        if (!adminUser) return null;

        return {
            id: adminUser.id,
            email: adminUser.email,
            passwordHash: adminUser.passwordHash,
            permissionLevel: adminUser.permissionLevel,
        };
    }
}