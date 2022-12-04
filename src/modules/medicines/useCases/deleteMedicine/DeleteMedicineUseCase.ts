import { NotFoundError } from '../../../../helpers/errors';
import { IMedicinesRepository } from '../../repositories/IMedicinesRepository';
import { DeleteMedicineRequestDTO } from './DeleteMedicineDTOs';

export interface IDeleteMedicineUseCase {
    execute({ id }: DeleteMedicineRequestDTO): Promise<void>;
}

export class DeleteMedicineUseCase implements IDeleteMedicineUseCase {
    constructor(private medicinesRepository: IMedicinesRepository) {}

    async execute({ id }: DeleteMedicineRequestDTO): Promise<void> {
        const medicineExists = await this.medicinesRepository.getById(id);

        if (!medicineExists) throw new NotFoundError('medicine not found');

        await this.medicinesRepository.deleteById(id);
    }
}
