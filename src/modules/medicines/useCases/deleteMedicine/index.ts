import { PrismaMedicinesRepository } from '../../repositories/implementations/prisma/PrismaMedicinesRepository';
import { DeleteMedicineUseCase } from './DeleteMedicineUseCase';

const medicinesRepository = new PrismaMedicinesRepository();
const deleteMedicineUseCase = new DeleteMedicineUseCase(medicinesRepository);

export { deleteMedicineUseCase };
