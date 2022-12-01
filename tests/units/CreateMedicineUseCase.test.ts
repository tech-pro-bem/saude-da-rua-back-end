import { InMemoryMedicinesRepository } from '../../src/modules/medicines/repositories/implementations/inmemory/InMemoryMedicinesRepository';
import { IMedicinesRepository } from '../../src/modules/medicines/repositories/IMedicinesRepository';
import { CreateMedicineUseCase } from '../../src/modules/medicines/useCases/createMedicine/CreateMedicineUseCase';
import { getRandomMedicine } from '../helpers/GenerateDataForTests';

let medicinesRepository: IMedicinesRepository;
let createMedicineUseCase: CreateMedicineUseCase;
describe('CreateMedicineUseCase', () => {
    beforeEach(() => {
        medicinesRepository = new InMemoryMedicinesRepository();
        createMedicineUseCase = new CreateMedicineUseCase(medicinesRepository);
    });

    it('should be able to create a new medicine', async () => {
        const {
            CEP,
            email,
            expirationDate,
            fullName,
            medicineName,
            milligrams,
            pharmaceuticalForm,
            cellPhoneWithDDD,
            quantity,
            state,
        } = await getRandomMedicine({ repository: medicinesRepository });

        const medicine = await createMedicineUseCase.execute({
            CEP,
            email,
            expirationDate,
            fullName,
            medicineName,
            milligrams,
            pharmaceuticalForm,
            cellPhoneWithDDD,
            quantity,
            state,
        });

        const medicineExists = await medicinesRepository.getById(medicine.id);

        expect(medicineExists).not.toBeNull();
    });
});
