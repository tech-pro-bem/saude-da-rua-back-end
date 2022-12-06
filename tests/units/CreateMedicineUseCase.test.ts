import { InMemoryMedicinesRepository } from '../../src/modules/medicines/repositories/implementations/inmemory/InMemoryMedicinesRepository';
import { IMedicinesRepository } from '../../src/modules/medicines/repositories/IMedicinesRepository';
import { CreateMedicinesUseCase } from '../../src/modules/medicines/useCases/createMedicines/CreateMedicinesUseCase';
import { getRandomMedicine } from '../helpers/GenerateDataForTests';

let medicinesRepository: IMedicinesRepository;
let createMedicinesUseCase: CreateMedicinesUseCase;
describe('CreateMedicinesUseCase', () => {
    beforeEach(() => {
        medicinesRepository = new InMemoryMedicinesRepository();
        createMedicinesUseCase = new CreateMedicinesUseCase(
            medicinesRepository
        );
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

        const medicines = await createMedicinesUseCase.execute({
            CEP,
            email,
            fullName,
            cellPhoneWithDDD,
            state,
            medicines: [
                {
                    expirationDate,
                    medicineName,
                    milligrams,
                    pharmaceuticalForm,
                    quantity,
                },
            ],
        });

        const medicineExists = await medicinesRepository.getById(
            medicines[0].id
        );

        expect(medicines.length).toEqual(1);
        expect(medicineExists).not.toBeNull();
    });
});
