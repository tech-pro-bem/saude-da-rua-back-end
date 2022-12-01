import { Medicine } from '../../../entities/Medicine';
import { IMedicinesRepository } from '../../IMedicinesRepository';

export class InMemoryMedicinesRepository implements IMedicinesRepository {
    async getById(id: string): Promise<Medicine> {
        const medicine = this.medicines.find((m) => m.id === id);

        if (!medicine) return null;

        return medicine;
    }

    private medicines: Medicine[] = [];

    async save(medicine: Medicine): Promise<Medicine> {
        const medicineIndex = this.medicines.findIndex(
            (m) => m.id === medicine.id
        );

        if (medicineIndex > -1) {
            this.medicines[medicineIndex] = medicine;
            return medicine;
        }

        this.medicines.push(medicine);
        return medicine;
    }
}
