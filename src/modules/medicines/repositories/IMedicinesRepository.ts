import { Medicine } from '../entities/Medicine';

export interface IMedicinesRepository {
    save(medicine: Medicine): Promise<Medicine>;
    getById(id: string): Promise<Medicine | null>;
    list(): Promise<Medicine[]>;
}
