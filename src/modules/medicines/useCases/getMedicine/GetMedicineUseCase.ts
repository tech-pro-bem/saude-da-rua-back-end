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

        // TODO: This should be moved to a separate route, but due to frontend time and resources
        // It will be in here for now
        medicine.wasRead = true;
        await this.medicinesRepository.save(medicine);

        return medicine;
    }
}
