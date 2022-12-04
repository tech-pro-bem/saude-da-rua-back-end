import { PrismaMedicinesRepository } from '../../repositories/implementations/prisma/PrismaMedicinesRepository';
import { ListMedicinesUseCase } from './ListMedicinesUseCase';

const medicinesRepository = new PrismaMedicinesRepository();
const listMedicinesUseCase = new ListMedicinesUseCase(medicinesRepository);

export { listMedicinesUseCase };
