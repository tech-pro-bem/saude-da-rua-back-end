import { hash } from 'bcryptjs';
import { Admin } from '../../modules/admins/entities/Admin';
import { PrismaPostgresClient } from '../database/PrismaPostgresClient';

const prismaPostgres = new PrismaPostgresClient();
const prismaClient = prismaPostgres.getPrismaClient();

(async () => {
    if (!process.env.INITIAL_ADMIN_PASSWORD) return;

    const passwordHash = await hash(process.env.INITIAL_ADMIN_PASSWORD, 10);

    const isAdminAlreadyCreated = await prismaClient.admin.findFirst({
        where: { email: 'teste@teste.com' },
    });

    if (isAdminAlreadyCreated) {
        console.log('Seed created!\nEmail: teste@teste.com');
        return;
    }

    await prismaClient.admin.create({
        data: new Admin({
            email: 'teste@teste.com',
            name: 'test test',
            passwordHash,
            permissionLevel: '1',
        }),
    });

    console.log('Seed created!\nEmail: test@example.com');
})();
