import { randomUUID } from 'crypto';
import { beforeEach } from 'vitest';
import { InMemoryMedicinesRepository } from '../../src/modules/medicines/repositories/implementations/inmemory/InMemoryMedicinesRepository';
import {
    GetMedicineUseCase,
    IGetMedicineUseCase,
} from '../../src/modules/medicines/useCases/getMedicine/GetMedicineUseCase';
import { IMedicinesRepository } from '../../src/modules/medicines/repositories/IMedicinesRepository';
import { getRandomMedicine } from '../helpers/GenerateDataForTests';
import { NotFoundError } from '../../src/helpers/errors';

let medicinesRepository: IMedicinesRepository;
let getMedicineUseCase: IGetMedicineUseCase;
describe('GetMedicineUseCase', () => {
    beforeEach(() => {
        medicinesRepository = new InMemoryMedicinesRepository();
        getMedicineUseCase = new GetMedicineUseCase(medicinesRepository);
    });

    it('should be able to get a medicine by id', async () => {
        const randomMedicine = await getRandomMedicine({
            repository: medicinesRepository,
        });

        const medicine = await getMedicineUseCase.execute({
            id: randomMedicine.id,
        });

        expect(medicine).not.toBeNull();
        expect(medicine.id).toEqual(randomMedicine.id);
    });

    it("shouldn't be able to get a medicine that doesnt exists", async () => {
        await expect(async () => {
            await getMedicineUseCase.execute({ id: randomUUID() });
        }).rejects.toEqual(new NotFoundError('medicine not found'));
    });
});
