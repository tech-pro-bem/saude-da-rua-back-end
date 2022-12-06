import pLimit from 'p-limit';
import { CreateMedicinesRequestDTO } from './CreateMedicinesDTOs';
import { Medicine } from '../../entities/Medicine';
import { IMedicinesRepository } from '../../repositories/IMedicinesRepository';

export interface ICreateMedicinesUseCase {
    execute(
        createMedicinesRequestDTO: CreateMedicinesRequestDTO
    ): Promise<Medicine[]>;
}

export class CreateMedicinesUseCase implements ICreateMedicinesUseCase {
    constructor(private medicinesRepository: IMedicinesRepository) {}

    async execute(
        createMedicinesRequestDTO: CreateMedicinesRequestDTO
    ): Promise<Medicine[]> {
        // Limit on how much promises will be handled at one time
        const limit = pLimit(10);

        const medicines: Medicine[] = [];

        const { CEP, cellPhoneWithDDD, email, fullName, state } =
            createMedicinesRequestDTO;

        createMedicinesRequestDTO.medicines.forEach((medicine) => {
            medicines.push(
                new Medicine({
                    cellPhoneWithDDD,
                    CEP,
                    email,
                    fullName,
                    state,
                    ...medicine,
                })
            );
        });

        const medicinePromises = [];

        for (const medicine of medicines) {
            medicinePromises.push(
                limit(() =>
                    this.medicinesRepository.save(new Medicine(medicine))
                )
            );
        }

        await Promise.all(medicinePromises);

        return medicines;
    }
}
