import { PrismaMedicinesRepository } from '../../repositories/implementations/prisma/PrismaMedicinesRepository';
import { CreateMedicineUseCase } from './CreateMedicineUseCase';

export const medicinesRepository = new PrismaMedicinesRepository();
export const createMedicineUseCase = new CreateMedicineUseCase(
    medicinesRepository
);
