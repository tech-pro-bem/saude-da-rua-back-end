import { hash } from 'bcryptjs';
import { Admin } from '../../modules/admins/entities/Admin';
import { PrismaPostgresClient } from '../database/PrismaPostgresClient';

const prismaPostgres = new PrismaPostgresClient();
const prismaClient = prismaPostgres.getPrismaClient();

(async () => {
    const passwordHash = await hash('test12345', 10);

    const isAdminAlreadyCreated = await prismaClient.admin.findFirst({
        where: { email: 'test@example.com' },
    });

    if (isAdminAlreadyCreated) {
        console.log(
            'Seed created!\nEmail: test@example.com\nPassword: test12345'
        );
        return;
    }

    await prismaClient.admin.create({
        data: new Admin({
            email: 'test@example.com',
            name: 'test test',
            passwordHash,
            permissionLevel: "1"
        }),
    });

    console.log('Seed created!\nEmail: test@example.com\nPassword: test12345');
})();
