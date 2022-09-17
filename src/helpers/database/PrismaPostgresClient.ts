import { PrismaClient } from '@prisma/client';

export class PrismaPostgresClient {
    private databaseURL = process.env.POSTGRES_DATABASE_URL;

    private testDatabaseURL = process.env.TEST_DATABASE_URL;

    public getPrismaClient() {
        if(testDatabaseURL) {
            process.env.DATABASE_URL = testDatabaseURL;
            return new PrismaClient();
        }

        process.env.DATABASE_URL = databaseURL;
        return new PrismaClient();
    }
}
