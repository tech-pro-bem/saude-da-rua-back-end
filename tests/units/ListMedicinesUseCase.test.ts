import { InMemoryMedicinesRepository } from '../../src/modules/medicines/repositories/implementations/inmemory/InMemoryMedicinesRepository';
import { IMedicinesRepository } from '../../src/modules/medicines/repositories/IMedicinesRepository';
import {
    IListMedicinesUseCase,
    ListMedicinesUseCase,
} from '../../src/modules/medicines/useCases/listMedicines/ListMedicinesUseCase';
import { getRandomMedicine } from '../helpers/GenerateDataForTests';

let medicinesRepository: IMedicinesRepository;
let listMedicinesUseCase: IListMedicinesUseCase;
describe('ListMedicinesUseCase', () => {
    beforeEach(() => {
        medicinesRepository = new InMemoryMedicinesRepository();
        listMedicinesUseCase = new ListMedicinesUseCase(medicinesRepository);
    });

    it('should be able to list all medicines', async () => {
        const randomMedicine = await getRandomMedicine({
            repository: medicinesRepository,
        });

        const medicines = await listMedicinesUseCase.execute();

        expect(medicines.length).toEqual(1);
        expect(medicines[0].id).toEqual(randomMedicine.id);
    });
});
