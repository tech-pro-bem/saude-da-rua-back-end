import { Medicine } from '../entities/Medicine';

export type ListMedicinesProps = {
    wasRead?: boolean;
};

export interface IMedicinesRepository {
    save(medicine: Medicine): Promise<Medicine>;
    getById(id: string): Promise<Medicine | null>;
    list(listMedicinesProps?: ListMedicinesProps): Promise<Medicine[]>;
    deleteById(id: string): Promise<void>;
}
