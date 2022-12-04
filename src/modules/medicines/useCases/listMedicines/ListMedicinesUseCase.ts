import { Medicine } from '../../entities/Medicine';
import { IMedicinesRepository } from '../../repositories/IMedicinesRepository';

export interface IListMedicinesUseCase {
    execute(): Promise<Medicine[]>;
}

export class ListMedicinesUseCase implements IListMedicinesUseCase {
    constructor(private medicinesRepository: IMedicinesRepository) {}

    async execute(): Promise<Medicine[]> {
        const medicines = await this.medicinesRepository.list();

        return medicines;
    }
}
