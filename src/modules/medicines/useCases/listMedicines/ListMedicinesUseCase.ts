import { ListMedicinesRequestDTO } from './ListMedicinesDTOs';
import { Medicine } from '../../entities/Medicine';
import { IMedicinesRepository } from '../../repositories/IMedicinesRepository';

export interface IListMedicinesUseCase {
    execute(listMedicinesDTO?: ListMedicinesRequestDTO): Promise<Medicine[]>;
}

export class ListMedicinesUseCase implements IListMedicinesUseCase {
    constructor(private medicinesRepository: IMedicinesRepository) {}

    async execute(
        listMedicinesDTO?: ListMedicinesRequestDTO
    ): Promise<Medicine[]> {
        const medicines = await this.medicinesRepository.list({
            wasRead: listMedicinesDTO?.wasRead,
        });

        return medicines;
    }
}
