import { PrismaClient } from '@prisma/client';
import Admin from '../../../entities/Admin';
import { PrismaPostgresClient } from '../../../helpers/database/PrismaPostgresClient';
import { ICreateAdminRepository } from '../../interfaces';

export class CreateAdminPrismaRepository
    extends PrismaPostgresClient
    implements ICreateAdminRepository
{
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = super.getPrismaClient();
    }

    async checkIfAdminExistsByEmail(email: string): Promise<boolean> {
        const admin = await this.prisma.admin.findFirst({ where: { email } });

        if (!admin) return false;

        return true;
    }

    async saveAdmin(admin: Admin): Promise<boolean> {
        await this.prisma.admin.upsert({
            create: admin,
            where: { id: admin.id },
            update: admin,
        });

        return true;
    }
}
