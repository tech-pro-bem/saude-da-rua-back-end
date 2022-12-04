import { PrismaMedicinesRepository } from '../../repositories/implementations/prisma/PrismaMedicinesRepository';
import { GetMedicineUseCase } from './GetMedicineUseCase';

const medicinesRepository = new PrismaMedicinesRepository();
const getMedicineUseCase = new GetMedicineUseCase(medicinesRepository);

export { getMedicineUseCase };
