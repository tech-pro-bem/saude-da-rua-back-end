import { Medicine } from '../../../entities/Medicine';
import {
    IMedicinesRepository,
    ListMedicinesProps,
} from '../../IMedicinesRepository';

export class InMemoryMedicinesRepository implements IMedicinesRepository {
    async deleteById(id: string): Promise<void> {
        const medicineIndex = this.medicines.findIndex(
            (medicine) => medicine.id === id
        );

        if (medicineIndex <= -1) return;

        this.medicines.splice(medicineIndex, 1);
    }

    async list(listMedicinesProps?: ListMedicinesProps): Promise<Medicine[]> {
        let { medicines } = this;

        if (typeof listMedicinesProps?.wasRead === 'boolean') {
            medicines = medicines.filter(
                (medicine) => medicine.wasRead === listMedicinesProps.wasRead
            );
        }

        return medicines;
    }

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
