export type CreateMedicinesRequestDTO = {
    fullName: string;
    address: string;
    CEP: string;
    city: string;
    cellPhoneWithDDD: string;
    email: string;
    state: string;
    medicines: {
        medicineName: string;
        milligrams: string;
        quantity: number;
        expirationDate: Date;
        pharmaceuticalForm: string;
    }[];
};
