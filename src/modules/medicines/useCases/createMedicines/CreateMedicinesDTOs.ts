export type CreateMedicinesRequestDTO = {
    fullName: string;
    address: string;
    CEP: string;
    city: string;
    cellPhoneWithDDD: string;
    email: string;
    medicines: {
        medicineName: string;
        milligrams: string;
        quantity: number;
        expirationDate: Date;
        pharmaceuticalForm: string;
    }[];
};
