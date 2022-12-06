import { PrismaMedicinesRepository } from '../../repositories/implementations/prisma/PrismaMedicinesRepository';
import { CreateMedicinesUseCase } from './CreateMedicinesUseCase';

export const medicinesRepository = new PrismaMedicinesRepository();
export const createMedicinesUseCase = new CreateMedicinesUseCase(
    medicinesRepository
);
