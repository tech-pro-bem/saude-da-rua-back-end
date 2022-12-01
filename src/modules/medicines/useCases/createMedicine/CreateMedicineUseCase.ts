import { CreateMedicineRequestDTO } from './CreateMedicineDTOs';
import { Medicine } from '../../entities/Medicine';
import { IMedicinesRepository } from '../../repositories/IMedicinesRepository';

export interface ICreateMedicineUseCase {
    execute(
        createMedicineRequestDTO: CreateMedicineRequestDTO
    ): Promise<Medicine>;
}

export class CreateMedicineUseCase implements ICreateMedicineUseCase {
    constructor(private medicinesRepository: IMedicinesRepository) {}

    async execute(
        createMedicineRequestDTO: CreateMedicineRequestDTO
    ): Promise<Medicine> {
        const medicine = await this.medicinesRepository.save(
            new Medicine(createMedicineRequestDTO)
        );

        return medicine;
    }
}
