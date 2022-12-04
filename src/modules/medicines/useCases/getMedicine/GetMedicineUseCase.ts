import { NotFoundError } from '../../../../helpers/errors';
import { Medicine } from '../../entities/Medicine';
import { IMedicinesRepository } from '../../repositories/IMedicinesRepository';
import { GetMedicineRequestDTO } from './GetMedicineDTOs';

export interface IGetMedicineUseCase {
    execute({ id }: GetMedicineRequestDTO): Promise<Medicine>;
}

export class GetMedicineUseCase implements IGetMedicineUseCase {
    constructor(private medicinesRepository: IMedicinesRepository) {}

    async execute({ id }: GetMedicineRequestDTO): Promise<Medicine> {
        const medicine = await this.medicinesRepository.getById(id);

        if (!medicine) throw new NotFoundError('medicine not found');

        return medicine;
    }
}
