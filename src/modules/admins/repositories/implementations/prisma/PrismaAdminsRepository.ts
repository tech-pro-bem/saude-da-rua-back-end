import { PrismaClient } from "@prisma/client";
import { PrismaPostgresClient } from "../../../../../helpers/database/PrismaPostgresClient";
import { IAdminsRepository } from "../../IAdminsRepository";
import { Admin } from "../../../entities/Admin";

export class PrismaAdminsRepository
    extends PrismaPostgresClient
    implements IAdminsRepository
{
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = this.getPrismaClient();
    }

    async checkIfAdminExistsByEmail(email: string): Promise<boolean> {
        const admin = await this.prisma.admin.findFirst({ where: { email } });

        if (!admin) return false;

        return true;
    }

    async getAdminByEmail(email: string): Promise<Admin> {
        const adminUser = await this.prisma.admin.findFirst({
            where: {
                email,
            },
        });

        if (!adminUser) return null;

        return new Admin(adminUser);
    }

    async saveAdmin(admin: Admin): Promise<boolean> {
        await this.prisma.admin.upsert({
            create: admin,
            where: { id: admin.id },
            update: admin,
        });

        return true;
    }

    async deleteAdmin(id: string): Promise<void> {
        await this.prisma.file.delete({ where: { id } });
    }
}
