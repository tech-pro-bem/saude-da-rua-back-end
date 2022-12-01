import { PrismaClient } from '@prisma/client';
import { PrismaPostgresClient } from '../../../../../helpers/database/PrismaPostgresClient';
import { Medicine } from '../../../entities/Medicine';
import { IMedicinesRepository } from '../../IMedicinesRepository';

export class PrismaMedicinesRepository
    extends PrismaPostgresClient
    implements IMedicinesRepository
{
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = this.getPrismaClient();
    }

    async save(medicine: Medicine): Promise<Medicine> {
        await this.prisma.medicine.upsert({
            create: medicine,
            where: { id: medicine.id },
            update: medicine,
        });

        return medicine;
    }

    async getById(id: string): Promise<Medicine> {
        const medicine = await this.prisma.medicine.findUnique({
            where: { id },
        });

        if (!medicine) return null;

        return new Medicine(medicine);
    }
}
