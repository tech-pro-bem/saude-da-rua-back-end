import { PrismaClient } from '@prisma/client';

export class PrismaPostgresClient {
    private devDatabaseURL =
        'postgresql://postgres:saudedarua@localhost:5432/saude_da_rua?schema=public';

    private testDatabaseURL = '';

    public getPrismaClient() {
        switch (process.env.IS_PRODUCTION) {
            case 'false':
                process.env.DATABASE_URL = this.devDatabaseURL;
                break;
            default:
                process.env.DATABASE_URL = this.testDatabaseURL;
        }

        return new PrismaClient();
    }
}
