import { PrismaClient } from "@prisma/client";
import { PrismaPostgresClient } from "../../../../../helpers/database/PrismaPostgresClient";
import { IAdminsRepository } from "../../IAdminsRepository";
import { Admin } from "../../../entities/Admin";
import { IGetAdminsRequestDTO } from "../../../useCases/getAdmins/GetAdminsRequestDTO";

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
        await this.prisma.admin.delete({ where: { id } });
    }

    async updateAdminPermissionLevelUseCase(id: string, level: string): Promise<void> {
        await this.prisma.admin.update({
            where: { id },
            data: { 
                permissionLevel: level
            }
        });
    }

    async list(params: IGetAdminsRequestDTO): Promise<Admin[]> {
        const listOfAdmins = await this.prisma.admin.findMany({
            take: params.limit,
            cursor: params.lastAdminId ? { id: params.lastAdminId } : undefined,
            where: {
                email: {
                    contains: '@',
                },
            },
        });

        return listOfAdmins.map(
            (admin) => {
                delete admin.passwordHash
                return new Admin(admin)
            }
        );
;
    }
}
