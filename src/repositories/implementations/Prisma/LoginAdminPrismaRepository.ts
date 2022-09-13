import { PrismaClient } from '@prisma/client';
import Admin from '../../../entities/Admin';
import { PrismaPostgresClient } from '../../../helpers/database/PrismaPostgresClient';
import { ILoginAdminRepository } from '../../interfaces';

export class LoginAdminPrismaRepository
    extends PrismaPostgresClient
    implements ILoginAdminRepository
{
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = super.getPrismaClient();
    }

    async getAdminInfoByEmail(email: string): Promise<Admin> {
        const queryAdminParams = await this.prisma.admin.findFirst({
            where: {
                email,
            },
        });

        return queryAdminParams;
    }
}
