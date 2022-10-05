import { PrismaClient } from '@prisma/client';

export class PrismaPostgresClient {
    private databaseURL = process.env.DATABASE_URL;

    private testDatabaseURL = process.env.TEST_DATABASE_URL;

    public getPrismaClient() {
        if (this.testDatabaseURL) {
            process.env.DATABASE_URL = this.testDatabaseURL;
            return new PrismaClient();
        }

        process.env.DATABASE_URL = this.databaseURL;
        return new PrismaClient();
    }
}
