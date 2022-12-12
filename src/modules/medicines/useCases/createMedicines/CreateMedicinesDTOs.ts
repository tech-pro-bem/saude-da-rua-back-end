export type CreateMedicinesRequestDTO = {
    fullName: string;
    address: string;
    CEP: string;
    city: string;
    state: string;
    cellPhoneWithDDD: string;
    email: string;
    medicines: {
        medicineName: string;
        milligrams: number;
        quantity: number;
        expirationDate: Date;
        pharmaceuticalForm: string;
    }[];
};
