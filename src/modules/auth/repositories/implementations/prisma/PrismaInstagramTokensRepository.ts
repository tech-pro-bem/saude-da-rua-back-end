import { PrismaClient } from '@prisma/client';
import { IInstagramTokensRepository } from '../../IInstagramTokensRepository';
import { PrismaPostgresClient } from '../../../../../helpers/database/PrismaPostgresClient';
import { InstagramToken } from '../../../entities/InstagramToken';

export class PrismaInstagramTokensRepository
    extends PrismaPostgresClient
    implements IInstagramTokensRepository
{
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = super.getPrismaClient();
    }

    async find(): Promise<InstagramToken | null> {
        const instagramToken = await this.prisma.instagramToken.findFirst();

        if (!instagramToken) return null;

        return new InstagramToken(instagramToken);
    }

    async save(instagramToken: InstagramToken): Promise<InstagramToken> {
        const tokenExists = await this.prisma.instagramToken.findFirst();

        if (tokenExists) {
            await this.prisma.instagramToken.update({
                where: { id: tokenExists.id },
                data: instagramToken,
            });

            return instagramToken;
        }

        await this.prisma.instagramToken.create({
            data: instagramToken,
        });

        return instagramToken;
    }
}
