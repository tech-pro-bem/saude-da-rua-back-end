import { randomUUID } from 'crypto';
import { NotFoundError } from '@prisma/client/runtime';
import { InMemoryMedicinesRepository } from '../../src/modules/medicines/repositories/implementations/inmemory/InMemoryMedicinesRepository';
import { IMedicinesRepository } from '../../src/modules/medicines/repositories/IMedicinesRepository';
import { DeleteMedicineUseCase } from '../../src/modules/medicines/useCases/deleteMedicine/DeleteMedicineUseCase';
import { getRandomMedicine } from '../helpers/GenerateDataForTests';

let medicinesRepository: IMedicinesRepository;
let deleteMedicineUseCase: DeleteMedicineUseCase;
describe('DeleteMedicineUseCase', () => {
    beforeEach(() => {
        medicinesRepository = new InMemoryMedicinesRepository();
        deleteMedicineUseCase = new DeleteMedicineUseCase(medicinesRepository);
    });

    it('should be able to delete a medicine by id', async () => {
        const medicine = await getRandomMedicine({
            repository: medicinesRepository,
        });

        await deleteMedicineUseCase.execute({ id: medicine.id });

        const medicineExists = await medicinesRepository.getById(medicine.id);

        expect(medicineExists).toBeNull();
    });

    it("shouldn't be able to delete a medicine with non-existent id", async () => {
        await expect(async () => {
            await deleteMedicineUseCase.execute({ id: randomUUID() });
        }).rejects.toEqual(new NotFoundError('medicine not found'));
    });
});
