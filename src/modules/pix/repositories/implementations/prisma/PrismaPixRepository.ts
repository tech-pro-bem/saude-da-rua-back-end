import { PrismaClient } from '@prisma/client';
import { IPixRepository } from '../../IPixRepository';
import { PrismaPostgresClient } from '../../../../../helpers/database/PrismaPostgresClient';
import { Pix } from '../../../entities/Pix';

export class PrismaPixRepository
    extends PrismaPostgresClient
    implements IPixRepository
{
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = super.getPrismaClient();
    }

    async find(): Promise<Pix | null> {
        const pix = await this.prisma.pix.findFirst();

        if (!pix) return null;

        return new Pix(pix);
    }

    async save(pix: Pix): Promise<Pix> {
        const pixExists = await this.prisma.pix.findFirst();

        if (pixExists) {
            await this.prisma.pix.update({
                where: { id: pix.id },
                data: pix,
            });

            return pix;
        }

        await this.prisma.pix.create({
            data: pix,
        });

        return pix;
    }
}
