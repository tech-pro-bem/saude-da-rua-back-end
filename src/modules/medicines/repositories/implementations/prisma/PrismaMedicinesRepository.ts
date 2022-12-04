import { PrismaClient } from '@prisma/client';
import { PrismaPostgresClient } from '../../../../../helpers/database/PrismaPostgresClient';
import { Medicine } from '../../../entities/Medicine';
import {
    IMedicinesRepository,
    ListMedicinesProps,
} from '../../IMedicinesRepository';

export class PrismaMedicinesRepository
    extends PrismaPostgresClient
    implements IMedicinesRepository
{
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = this.getPrismaClient();
    }

    async deleteById(id: string): Promise<void> {
        await this.prisma.medicine.delete({ where: { id } });
    }

    async list(listMedicinesProps?: ListMedicinesProps): Promise<Medicine[]> {
        const medicines = await this.prisma.medicine.findMany({
            where: {
                wasRead: listMedicinesProps.wasRead,
            },
        });

        return medicines.map((medicine) => new Medicine(medicine));
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
